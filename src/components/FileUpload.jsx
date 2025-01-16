import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./FileUpload.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Utility to generate a random cookie name
const generateCookieName = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

// Set a cookie
const setCookie = (name, value) => {
  document.cookie = `${name}=${value}; path=/; samesite=strict;`;
};

// Get a cookie value
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
};

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [modelType, setModelType] = useState("");
  const [cookieName, setCookieName] = useState(
    getCookie("result_cookie") || generateCookieName()
  );
  const navigate = useNavigate();

  // Set a new cookie if it doesn't exist
  useEffect(() => {
    if (!getCookie("result_cookie")) {
      setCookie("result_cookie", cookieName);
    }
  }, [cookieName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleModelTypeChange = (event) => {
    setModelType(event.target.value);
  };

  // 1) Upload the file -> call process_nrrd
  // 2) Immediately request get_preprocessed_glb -> get the preprocessed .glb
  // 3) Navigate to /threed with the preprocessed GLB URL
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    if (!modelType) {
      setError("Please select a model type");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cookie_name", cookieName);

    try {
      // Step 1: Process the NRRD file
      const processResponse = await axios.post(
        "http://127.0.0.1:5000/process_nrrd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Process NRRD Response:", processResponse.data);

      // Step 2: Retrieve the preprocessed GLB
      const glbFormData = new FormData();
      glbFormData.append("cookie_name", cookieName);

      const glbResponse = await axios.post(
        "http://127.0.0.1:5000/get_preprocessed_glb",
        glbFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const preprocessedUrl = window.URL.createObjectURL(
        new Blob([glbResponse.data])
      );

      setResponse(preprocessedUrl);
      toast.success("Preprocessed 3D file is ready!");
      setError(null);

      // Navigate to /threed with the preprocessed GLB and model info
      navigate("/threed", {
        state: {
          url: preprocessedUrl,
          cookieName: cookieName,
          modelType: modelType,
        },
      });
    } catch (err) {
      console.error("Error during upload process:", err);
      setResponse(null);
      setError(
        err.response?.data?.error ||
          "An error occurred during the upload process"
      );
      toast.error("Failed to process the file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleView3D = () => {
    if (response) {
      navigate("/threed", { state: { url: response, cookieName, modelType } });
    } else {
      setError("No 3D file to view. Please process a file first.");
    }
  };

  return (
    <div className="page-container">
      <Toaster />
      <h1 className="main-heading">
        Skull Reconstruction Using Artificial Intelligence
      </h1>
      <div className="content-container">
        <div className="form-container">
          <div className="fileuploader">
            <label
              htmlFor="file-upload"
              className={`file-upload-label ${
                isVisible ? "visible" : "hidden"
              }`}
            >
              <AiOutlineCloudUpload size={50} color="#5f9ea0" />
              <p>Drag and drop a file here, or click to select a file</p>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
            {file && (
              <div style={{ marginTop: "10px" }}>
                <strong>Selected file:</strong> {file.name}
              </div>
            )}
          </div>

          <div className="model-type-selector" style={{ marginTop: "20px" }}>
            <label htmlFor="model-type">Select Model Type:</label>
            <select
              id="model-type"
              value={modelType}
              onChange={handleModelTypeChange}
              className="form-select"
            >
              <option value="">-- Choose Model Type --</option>
              <option value="reconstruction">Skull Reconstruction</option>
              <option value="implant">Implant Generation</option>
            </select>
          </div>

          <button
            type="button"
            className="btn upload"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Upload"
            )}
          </button>

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}

          {response && (
            <button
              className="btn btn-info"
              onClick={handleView3D}
              style={{ marginTop: "20px" }}
            >
              View 3D
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
