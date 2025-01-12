import React from "react";
import { useLocation } from "react-router-dom";

const Three = () => {
  const location = useLocation();
  const { glbBlobUrl } = location.state || {};

  if (!glbBlobUrl) {
    return <div>Error: No 3D model data available.</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>3D Model Viewer</h2>
      <model-viewer
        src={glbBlobUrl}
        alt="3D Model"
        camera-controls
        auto-rotate
        style={{ width: "800px", height: "600px" }}
      />
    </div>
  );
};

export default Three;
