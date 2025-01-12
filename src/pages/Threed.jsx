import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Threed.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import Hot Toast

const Threed = () => {
  const location = useLocation();
  const { url } = location.state || {};
  const cookieName = location.state?.cookieName;
  const navigate = useNavigate();

  if (!url) {
    return (
      <div className="error-container">No 3D file available to display.</div>
    );
  }

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "3DModel.glb"; // Default file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClearFiles = async () => {
    try {
      const formData = new FormData();
      formData.append("cookie_name", cookieName); // Send cookie_name as Form data

      const response = await axios.post(
        "http://127.0.0.1:5000/cleanup_files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct Content-Type
          },
        }
      );

      toast.success("Cleared SuccessFully"); // Show success toast
      navigate("/products");
    } catch (err) {
      console.error("Error clearing files:", err);
      toast.error("Failed to clear files. Please try again."); // Show error toast
    }
  };

  return (
    <div className="threed-container">
      <Toaster /> {/* Add Toaster component */}
      <h1 className="threed-title">3D Viewer</h1>
      <div className="viewer-box">
        <model-viewer
          src={url}
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
      <p className="instructions">
        Use your mouse to rotate or zoom the model.
      </p>
      <div className="button-container">
        <button className="download-button" onClick={handleDownload}>
          Download 3D Model
        </button>
        <button className="clear-button" onClick={handleClearFiles}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Threed;
