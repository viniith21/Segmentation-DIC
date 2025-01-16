import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Threed.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Threed = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { url, cookieName, modelType } = location.state || {};

  const [preprocessedUrl] = useState(url);
  const [predictedUrl, setPredictedUrl] = useState(null);

  const [currentUrl, setCurrentUrl] = useState(preprocessedUrl);
  const [compareMode, setCompareMode] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);

  if (!currentUrl && !compareMode) {
    return (
      <div className="error-container">No 3D file available to display.</div>
    );
  }

  let heading = "Preprocessed 3D";
  if (compareMode) {
    heading = "Comparison mode";
  } else if (predictedUrl && currentUrl === predictedUrl) {
    heading = "Predicted 3D";
  }

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = currentUrl;
    a.download = "3DModel.glb";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePredict = async () => {
    try {
      setIsPredicting(true);
      const predictionFormData = new FormData();
      predictionFormData.append("model_type", modelType);
      predictionFormData.append("cookie_name", cookieName);

      const predictionResponse = await axios.post(
        "http://127.0.0.1:5000/model_prediction",
        predictionFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const newPredictedUrl = window.URL.createObjectURL(
        new Blob([predictionResponse.data])
      );

      setPredictedUrl(newPredictedUrl);
      setCurrentUrl(newPredictedUrl);
      toast.success("Predicted 3D file is ready!");
    } catch (err) {
      console.error("Error generating prediction:", err);
      toast.error("Failed to generate the predicted model.");
    } finally {
      setIsPredicting(false);
    }
  };

  const handleCompare = () => {
    setCompareMode(!compareMode);
  };

  const handleClearFiles = async () => {
    try {
      const formData = new FormData();
      formData.append("cookie_name", cookieName);

      await axios.post("http://127.0.0.1:5000/cleanup_files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Cleared Successfully");
      navigate("/products");
    } catch (err) {
      console.error("Error clearing files:", err);
      toast.error("Failed to clear files. Please try again.");
    }
  };

  return (
    <div className="threed-container">
      <Toaster />
      <h1 className="threed-title">{heading}</h1>

      {isPredicting && (
        <div style={{ marginBottom: "20px", color: "#007bff" }}>
          <strong>Generating Prediction... Please wait.</strong>
        </div>
      )}

      {compareMode ? (
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ marginBottom: "10px" }}>Preprocessed</h3>
            <div className="viewer-box" style={{ width: "350px" }}>
              <model-viewer
                src={preprocessedUrl}
                alt="Preprocessed 3D Model"
                ar
                auto-rotate
                camera-controls
                className="model-viewer"
                field-of-view="30deg"
                camera-orbit="0deg 75deg 2.5m"
                exposure="1.5"
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <h3 style={{ marginBottom: "10px" }}>Predicted</h3>
            <div className="viewer-box" style={{ width: "350px" }}>
              {predictedUrl ? (
                <model-viewer
                  src={predictedUrl}
                  alt="Predicted 3D Model"
                  ar
                  auto-rotate
                  camera-controls
                  className="model-viewer"
                  field-of-view="30deg"
                  camera-orbit="0deg 75deg 2.5m"
                  exposure="1.5"
                />
              ) : (
                <div style={{ textAlign: "center", padding: "1em" }}>
                  No predicted model yet
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="viewer-box">
          <model-viewer
            src={currentUrl}
            alt="3D Model"
            ar
            auto-rotate
            camera-controls
            className="model-viewer"
            field-of-view="30deg"
            camera-orbit="0deg 75deg 2.5m"
            exposure="1.5"
          />
        </div>
      )}

      <p className="instructions">
        Use your mouse to rotate or zoom the model.
      </p>
      <div className="button-container">
        <button className="download-button" onClick={handleDownload}>
          Download 3D Model
        </button>
        {!predictedUrl && !isPredicting && (
          <button className="download-button" onClick={handlePredict}>
            Predict
          </button>
        )}
        {predictedUrl && (
          <button className="download-button" onClick={handleCompare}>
            {compareMode ? "Exit Compare" : "Compare"}
          </button>
        )}
        <button className="clear-button" onClick={handleClearFiles}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Threed;
