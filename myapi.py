from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.responses import JSONResponse
import os
import nrrd
import numpy as np
import SimpleITK as sitk
from scipy.ndimage import zoom
from tempfile import NamedTemporaryFile
import torch
import torch.nn as nn
from skimage import measure
import trimesh
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins for better security
    allow_credentials=True,
    allow_methods=["*"],  # HTTP methods allowed (e.g., GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Headers allowed (e.g., Content-Type, Authorization)
)

# Define the CRIGNet model
class CRIGNet(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(CRIGNet, self).__init__()
        self.encoder1 = self.conv_block(in_channels, 16)
        self.encoder2 = self.conv_block(16, 32)
        self.encoder3 = self.conv_block(32, 64)
        self.encoder4 = self.conv_block(64, 128)

        self.decoder1 = self.conv_block(128 + 64, 64)
        self.decoder2 = self.conv_block(64 + 32, 32)
        self.decoder3 = self.conv_block(32 + 16, 16)
        self.decoder4 = self.conv_block(16, out_channels, final_layer=True)

        self.pool = nn.MaxPool3d(2)
        self.up1 = nn.ConvTranspose3d(128, 128, kernel_size=2, stride=2)
        self.up2 = nn.ConvTranspose3d(64, 64, kernel_size=2, stride=2)
        self.up3 = nn.ConvTranspose3d(32, 32, kernel_size=2, stride=2)

    def conv_block(self, in_channels, out_channels, final_layer=False):
        if not final_layer:
            return nn.Sequential(
                nn.Conv3d(in_channels, out_channels, kernel_size=3, padding=1),
                nn.BatchNorm3d(out_channels),
                nn.ReLU(inplace=True),
                nn.Conv3d(out_channels, out_channels, kernel_size=3, padding=1),
                nn.BatchNorm3d(out_channels),
                nn.ReLU(inplace=True),
            )
        else:
            return nn.Sequential(
                nn.Conv3d(in_channels, out_channels, kernel_size=1),
                nn.Sigmoid()
            )

    def forward(self, x):
        e1 = self.encoder1(x)
        e2 = self.encoder2(self.pool(e1))
        e3 = self.encoder3(self.pool(e2))
        e4 = self.encoder4(self.pool(e3))

        d1 = self.up1(e4)
        d1 = self.decoder1(torch.cat([d1, e3], dim=1))
        d2 = self.up2(d1)
        d2 = self.decoder2(torch.cat([d2, e2], dim=1))
        d3 = self.up3(d2)
        d3 = self.decoder3(torch.cat([d3, e1], dim=1))
        d4 = self.decoder4(d3)

        return d4

# Load the model
def load_model(weights_path, in_channels=1, out_channels=1):
    model = CRIGNet(in_channels, out_channels)
    model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu')))
    model.eval()
    return model

# Define preprocessing steps
def denoise_skull(image_array):
    image = sitk.GetImageFromArray(image_array)
    denoised_image = sitk.Median(image)
    return sitk.GetArrayFromImage(denoised_image)

def apply_cca(image_array):
    image = sitk.GetImageFromArray(image_array)

    if np.max(image_array) <= 1.0:
        rescaled_image_array = (image_array * 2000).astype(np.int16)
        image = sitk.GetImageFromArray(rescaled_image_array)

    lower_threshold = 200
    upper_threshold = 2000
    thresholded_image = sitk.BinaryThreshold(image, lower_threshold, upper_threshold, 1, 0)
    connected_components = sitk.ConnectedComponent(thresholded_image)
    label_shape_statistics = sitk.LabelShapeStatisticsImageFilter()
    label_shape_statistics.Execute(connected_components)

    largest_label = max(range(1, label_shape_statistics.GetNumberOfLabels() + 1),
                        key=label_shape_statistics.GetNumberOfPixels)

    largest_component = sitk.BinaryThreshold(connected_components, largest_label, largest_label, 1, 0)

    return sitk.GetArrayFromImage(largest_component)

def crop_nrrd_file(image_array):
    size = image_array.shape[2]
    keep_size = int(size * (4 / 7))
    cropped_array = image_array[:, :, keep_size:]
    return cropped_array

def pad_nrrd_file(image_array):
    padded_array = np.pad(image_array, ((0, 0), (0, 0), (0, 256 - image_array.shape[2])), mode='constant')
    return padded_array

def resample_image(image_array, target_shape=[128, 128, 64]):
    original_shape = image_array.shape
    zoom_factors = [target_shape[i] / original_shape[i] for i in range(3)]
    resampled_data = zoom(image_array, zoom_factors, order=1)
    return resampled_data

# Preprocess function
def preprocess_image(image_array, header):
    denoised = denoise_skull(image_array)
    cca = apply_cca(denoised)
    cropped = crop_nrrd_file(cca)
    padded = pad_nrrd_file(cropped)
    resampled = resample_image(padded, target_shape=[128, 128, 64])
    return resampled, header


@app.get("/status")
async def start():
    return JSONResponse({"message":"OK STATUS"})


@app.post("/process_nrrd")
async def process_nrrd(file: UploadFile = File(...), cookie_name: str = Form(...)):
    try:
        # Save original NRRD with cookie_name prefix
        output_folder = os.path.join(os.getcwd(), "nrrd_output")
        os.makedirs(output_folder, exist_ok=True)
        original_output_path = os.path.join(output_folder, f"{cookie_name}_original.nrrd")

        with NamedTemporaryFile(delete=False, suffix=".nrrd") as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        nrrd_data, header = nrrd.read(temp_file_path)
        nrrd.write(original_output_path, nrrd_data, header)

        # Preprocess and save preprocessed NRRD with cookie_name prefix
        preprocessed_data, updated_header = preprocess_image(nrrd_data, header)
        preprocessed_output_path = os.path.join(output_folder, f"{cookie_name}_preprocessed.nrrd")
        nrrd.write(preprocessed_output_path, preprocessed_data, updated_header)

        os.remove(temp_file_path)

        return JSONResponse({
            "original_output_path": original_output_path,
            "preprocessed_output_path": preprocessed_output_path
        })

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/model_prediction")
async def model_prediction(model_type: str = Form(...), cookie_name: str = Form(...)):
    try:
        if not model_type:
            return JSONResponse({"error": "ModelType is Missing"}, status_code=400)

        weights_path = {
            'implant': r'D:\DIC\Testing - Copy\server\weights\SKRUNet_best_weight.pth',
            'reconstruction': r'D:\DIC\Testing - Copy\server\weights\SKRUNet_best_weight(recon).pth'
        }.get(model_type)

        if not weights_path:
            return JSONResponse({"error": f"Invalid model_type: {model_type}"}, status_code=400)

        model = load_model(weights_path)

        input_file_path = os.path.join(os.getcwd(), "nrrd_output", f"{cookie_name}_preprocessed.nrrd")
        if not os.path.exists(input_file_path):
            return JSONResponse({"error": f"Preprocessed file not found for cookie_name: {cookie_name}"}, status_code=404)

        nrrd_data, header = nrrd.read(input_file_path)

        input_tensor = torch.from_numpy(nrrd_data).unsqueeze(0).unsqueeze(0).float()
        prediction = model(input_tensor).detach().numpy().squeeze()

        output_folder = os.path.join(os.getcwd(), "model_predictions")
        os.makedirs(output_folder, exist_ok=True)
        predicted_nrrd_path = os.path.join(output_folder, f"{cookie_name}_predicted.nrrd")
        nrrd.write(predicted_nrrd_path, prediction, header)

        spacing = [1.0, 1.0, 1.0]
        if "space directions" in header and header["space directions"] is not None:
            sdirs = header["space directions"]
            spacing = [
                np.linalg.norm(sdirs[0]),
                np.linalg.norm(sdirs[1]),
                np.linalg.norm(sdirs[2])
            ]

        verts, faces, _, _ = measure.marching_cubes(
            prediction,
            level=0.5,
            spacing=spacing
        )

        if "space origin" in header and header["space origin"] is not None:
            origin = np.array(header["space origin"])
            verts += origin

        trimesh_mesh = trimesh.Trimesh(vertices=verts, faces=faces)
        three_d_folder = os.path.join(os.getcwd(), "3d")
        os.makedirs(three_d_folder, exist_ok=True)
        three_d_output_path = os.path.join(three_d_folder, f"{cookie_name}_predicted.glb")
        trimesh_mesh.visual.vertex_colors = [[95, 8, 12, 255]] * len(trimesh_mesh.vertices)
        trimesh_mesh.export(three_d_output_path)

        return FileResponse(
            three_d_output_path,
            media_type="application/octet-stream",
            filename=f"{cookie_name}_predicted.glb"
        )

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/cleanup_files")
async def cleanup_files(cookie_name: str = Form(...)):
    try:
        directories = [
            os.path.join(os.getcwd(), "nrrd_output"),
            os.path.join(os.getcwd(), "model_predictions"),
            os.path.join(os.getcwd(), "3d")
        ]

        deleted_files = []

        for directory in directories:
            if os.path.exists(directory):
                for file in os.listdir(directory):
                    if file.startswith(cookie_name):
                        file_path = os.path.join(directory, file)
                        os.remove(file_path)
                        deleted_files.append(file_path)

        if not deleted_files:
            return JSONResponse(
                {"message": "No files found to delete for the given cookie_name."},
                status_code=404
            )

        return JSONResponse(
            {"message": "Cleanup successful.", "deleted_files": deleted_files}
        )

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/get_preprocessed_glb")
async def get_preprocessed_glb(cookie_name: str = Form(...)):
    try:
        preprocessed_nrrd_path = os.path.join(
            os.getcwd(), "nrrd_output", f"{cookie_name}_preprocessed.nrrd"
        )
        if not os.path.exists(preprocessed_nrrd_path):
            return JSONResponse(
                {"error": f"Preprocessed file not found for cookie_name: {cookie_name}"},
                status_code=404
            )

        nrrd_data, header = nrrd.read(preprocessed_nrrd_path)

        spacing = [1.0, 1.0, 1.0]
        if "space directions" in header and header["space directions"] is not None:
            sdirs = header["space directions"]
            spacing = [
                np.linalg.norm(sdirs[0]),
                np.linalg.norm(sdirs[1]),
                np.linalg.norm(sdirs[2])
            ]

        verts_pre, faces_pre, _, _ = measure.marching_cubes(
            nrrd_data,
            level=0.5,
            spacing=spacing
        )

        if "space origin" in header and header["space origin"] is not None:
            origin = np.array(header["space origin"])
            verts_pre += origin

        trimesh_mesh_pre = trimesh.Trimesh(vertices=verts_pre, faces=faces_pre)
        trimesh_mesh_pre.visual.vertex_colors = [[95, 8, 12, 255]] * len(trimesh_mesh_pre.vertices)

        three_d_folder = os.path.join(os.getcwd(), "3d")
        os.makedirs(three_d_folder, exist_ok=True)
        preprocessed_glb_path = os.path.join(
            three_d_folder, f"{cookie_name}_preprocessed.glb"
        )
        trimesh_mesh_pre.export(preprocessed_glb_path)

        return FileResponse(
            preprocessed_glb_path,
            media_type="application/octet-stream",
            filename=f"{cookie_name}_preprocessed.glb"
        )

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
