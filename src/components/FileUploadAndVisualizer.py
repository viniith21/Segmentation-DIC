import vtk
import nrrd

# Function to load and check NRRD file using vtk
def load_nrrd_vtk(filename):
    reader = vtk.vtkNrrdReader()
    reader.SetFileName(filename)
    reader.Update()
    

    # Check if the file was loaded successfully
    image_data = reader.GetOutput()
    if image_data is None:
        raise RuntimeError(f"Failed to load NRRD file: {filename}")

    # Print information about the image data for debugging
    dims = image_data.GetDimensions()
    scalar_range = image_data.GetScalarRange()
    print(f"Loaded NRRD file with dimensions: {dims} and scalar range: {scalar_range}")

    # Create a color map for visualizing the volume (dark brown color scheme)
    color_func = vtk.vtkColorTransferFunction()
    color_func.AddRGBPoint(scalar_range[0], 0.2, 0.1, 0.05)  # Dark brown for min value
    color_func.AddRGBPoint(scalar_range[1], 0.4, 0.2, 0.1)  # Lighter brown for max value

    # Create an opacity transfer function
    opacity_func = vtk.vtkPiecewiseFunction()
    opacity_func.AddPoint(scalar_range[0], 0.0)
    opacity_func.AddPoint(scalar_range[1] * 0.5, 0.5)
    opacity_func.AddPoint(scalar_range[1], 1.0)

    # Set up the volume property
    volume_property = vtk.vtkVolumeProperty()
    volume_property.SetColor(color_func)
    volume_property.SetScalarOpacity(opacity_func)
    volume_property.ShadeOn()
    volume_property.SetInterpolationTypeToLinear()
    # volume.SetScale(1.0, 1.0, scale_factor)


    # Set up the volume mapper
    volume_mapper = vtk.vtkSmartVolumeMapper()
    volume_mapper.SetInputData(image_data)

    # Create the volume
    volume = vtk.vtkVolume()
    volume.SetMapper(volume_mapper)
    volume.SetProperty(volume_property)

    return volume

# Function to rotate the volume continuously around Z-axis
def continuous_rotation(volume, render_window):
    rotation_angle = 0

    def rotate_timer_callback(obj, event):
        nonlocal rotation_angle
        rotation_angle += 1  # Rotate by 1 degree per frame
        volume.SetOrientation(0, 0, rotation_angle)  # Rotate around the Z-axis
        render_window.Render()  # Re-render the window to reflect the rotation

    # Set up the timer to call the rotate function repeatedly
    render_window.GetInteractor().AddObserver('TimerEvent', rotate_timer_callback)
    render_window.GetInteractor().CreateRepeatingTimer(30)  # Slow speed by adjusting the timer interval

# Function to visualize the volume
def visualize_nrrd(filename):
    # Create a rendering window, renderer, and interactor
    renderer = vtk.vtkRenderer()
    render_window = vtk.vtkRenderWindow()
    render_window.AddRenderer(renderer)
    render_interactor = vtk.vtkRenderWindowInteractor()
    render_interactor.SetRenderWindow(render_window)

    # Load the NRRD file and get the volume
    try:
        volume = load_nrrd_vtk(filename)
    except RuntimeError as e:
        print(str(e))
        return

    # Add the volume to the renderer
    renderer.AddVolume(volume)
    renderer.SetBackground(1.0, 1.0, 1.0)  # White background

    # Set up the camera
    renderer.ResetCamera()

    # Add a light source for better visualization
    light = vtk.vtkLight()
    light.SetPosition(1, 1, 1)
    renderer.AddLight(light)

    # Render the scene
    render_window.SetSize(800, 600)
    render_window.Render()

    # Start continuous rotation around Z-axis
    continuous_rotation(volume, render_window)

    # Start the interaction
    render_interactor.Initialize()
    render_interactor.Start()

if __name__ == "__main__":
    # Path to the NRRD file
    filename = r"C:\Users\Prithul Joshi\OneDrive\Desktop\MODEL RESULTS\processed_output.nrrd"  # Change to your NRRD file path
    
    # Call the visualization function
    visualize_nrrd(filename)






# import nrrd
# import vtk
# import numpy as np
# import os

# def launch_vtk_visualizer(file_path):
#     # Check if the file exists
#     if not os.path.exists(file_path):
#         print("File not found:", file_path)
#         return

#     # Load the NRRD file
#     image, header = nrrd.read(file_path)
#     print("Image shape:", image.shape)  # Print shape to verify loading
#     print("Header info:", header)  # Print header info for debugging
#     print("Min value:", np.min(image))
#     print("Max value:", np.max(image))

#     # Normalize the image data
#     min_val = np.min(image)
#     max_val = np.max(image)
#     image_normalized = (image - min_val) / (max_val - min_val) * 255  # Scale to 0-255
#     image_normalized = np.clip(image_normalized, 0, 255).astype(np.uint8)  # Ensure data type is uint8

#     # Ensure the image is in the correct format for VTK
#     vtk_image = vtk.vtkImageImport()
#     vtk_image.CopyImportVoidPointer(image_normalized.tobytes(), image_normalized.nbytes)

#     # Set the appropriate scalar type based on the image data type
#     vtk_image.SetDataScalarTypeToUnsignedChar()
#     vtk_image.SetNumberOfScalarComponents(1)  # Assuming single channel
#     vtk_image.SetDataExtent(0, image.shape[2] - 1, 0, image.shape[1] - 1, 0, image.shape[0] - 1)  # Adjust dimensions
#     vtk_image.Update()

#     # Create an image actor to display the image
#     image_actor = vtk.vtkImageActor()
#     image_actor.GetMapper().SetInputConnection(vtk_image.GetOutputPort())  # Use SetInputConnection

#     # Create a lookup table for coloring the image (dark brown)
#     color_lookup_table = vtk.vtkLookupTable()
#     color_lookup_table.SetRange(0, 255)  # Set range for normalized data
#     color_lookup_table.SetNumberOfTableValues(256)  # Set the number of table values

#     # Set the colors for the lookup table
#     for i in range(256):
#         # For dark brown color
#         if i < 128:  # Dark brown for lower values
#             color_lookup_table.SetTableValue(i, 0.4, 0.2, 0.1, 1.0)  # Dark brown color with full opacity
#         else:  # Set higher values to white
#             color_lookup_table.SetTableValue(i, 1.0, 1.0, 1.0, 1.0)  # White with full opacity

#     color_lookup_table.Build()  # Build the lookup table

#     # Apply the lookup table to the actor
#     image_actor.GetProperty().SetLookupTable(color_lookup_table)  # Set the lookup table directly
#     image_actor.GetProperty().SetInterpolationTypeToLinear()  # Use linear interpolation for smoothness

#     # Create a renderer, render window, and interactor
#     renderer = vtk.vtkRenderer()
#     render_window = vtk.vtkRenderWindow()
#     render_window.AddRenderer(renderer)
#     render_window.SetSize(800, 600)

#     # Set the background color to white
#     renderer.SetBackground(1.0, 1.0, 1.0)  # White background

#     # Create the render window interactor
#     render_window_interactor = vtk.vtkRenderWindowInteractor()
#     render_window_interactor.SetRenderWindow(render_window)  # Set the render window

#     # Add the actor to the scene
#     renderer.AddActor(image_actor)
#     renderer.ResetCamera()

#     # Start the interaction
#     render_window.Render()
#     render_window_interactor.Start()

# # Specify the path to your output NRRD file
# file_path = r"C:\Users\Prithul Joshi\OneDrive\Desktop\MODEL RESULTS\processed_output.nrrd"    # Update with the correct path
# launch_vtk_visualizer(file_path)









