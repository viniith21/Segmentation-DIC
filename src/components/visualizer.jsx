// import React, { useState, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// const RotatingOBJModel = ({ url }) => {
//   const [obj, setObj] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loader = new OBJLoader();
//     loader.load(
//       url,
//       (object) => {
//         console.log("OBJ model loaded:", object); // Debug log
//         setObj(object);
//       },
//       undefined,
//       (err) => {
//         console.error("Error loading OBJ model:", err); // Debug log
//         setError("Failed to load OBJ model.");
//       }
//     );
//   }, [url]);

//   useFrame(({ clock }) => {
//     if (obj) {
//       obj.rotation.y = clock.getElapsedTime(); // Rotate around Y axis
//     }
//   });

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   return obj ? <primitive object={obj} scale={0.4} /> : null;
// };

// export default RotatingOBJModel;




import React, { useState } from "react";
import axios from "axios";
import { Canvas } from "@react-three/fiber";


const FileUploadAndVisualizer = () => {
  const [objUrl, setObjUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { obj_url, nifti_url } = response.data;

      // Update the state with the URL for the OBJ file
      setObjUrl(obj_url);
      setError(null);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {objUrl && (
        <Canvas style={{ height: "500px", width: "100%" }}>
          <FileUploadAndVisualizer url={objUrl} />
        </Canvas>
      )}
    </div>
  );
};

export default FileUploadAndVisualizer;
