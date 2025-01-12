// import React, { useState } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import FileUpload from '../components/body';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// // import React from 'react';
//  import ReactDOM from 'react-dom';
// //import App from './App';
// import './index.css'; // Your global styles
//  import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// function App() {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null); // Add state for error messages

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       console.error('No file selected');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       console.log('Sending file to server...');
//       const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Response received:', response);
//       setPrediction(response.data.prediction);
//       setError(null); // Clear any previous errors
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setPrediction(null); // Clear previous prediction
//       setError('Error uploading file: ' + (error.response ? error.response.data.error : error.message)); // Set error state
//     }
//   };

//   return (
//     <div className="App">
//       <Navbar/>
//       <h1>File Upload and Prediction</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload and Predict</button>
//       </form>
//       {error && (
//         <div>
//           <h2>Error:</h2>
//           <pre>{error}</pre>
//         </div>
//       )}
//       {prediction && (
//         <div>
//           <h2>Prediction:</h2>
//           <pre>{JSON.stringify(prediction, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import * as THREE from 'three';
// import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './index.css';

// function App() {
//   const [file, setFile] = useState(null);
//   const [predictionFile, setPredictionFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [scene, setScene] = useState(null);

//   useEffect(() => {
//     if (scene) {
//       const renderer = new THREE.WebGLRenderer();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       document.getElementById('visualization').appendChild(renderer.domElement);

//       const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//       camera.position.z = 5;

//       const controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableDamping = true;
//       controls.dampingFactor = 0.25;
//       controls.enableZoom = true;

//       const animate = () => {
//         requestAnimationFrame(animate);
//         controls.update();
//         renderer.render(scene, camera);
//       };

//       animate();
//     }
//   }, [scene]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       console.error('No file selected');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setPredictionFile(response.data.prediction_file);
//       setError(null);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setPredictionFile(null);
//       setError('Error uploading file: ' + (error.response ? error.response.data.error : error.message));
//     }
//   };

//   useEffect(() => {
//     if (predictionFile) {
//       const loader = new NRRDLoader();
//       loader.load(`http://127.0.0.1:5000/files/${predictionFile}`, (volume) => {
//         const scene = new THREE.Scene();
//         scene.add(volume);
//         setScene(scene);
//       });
//     }
//   }, [predictionFile]);

//   return (
//     <div className="App">
//       <Navbar/>
//       <h1>File Upload and Prediction</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload and Predict</button>
//       </form>
//       {error && (
//         <div>
//           <h2>Error:</h2>
//           <pre>{error}</pre>
//         </div>
//       )}
//       {predictionFile && (
//         <div>
//           <h2>Prediction File:</h2>
//           <div id="visualization" style={{ width: '100vw', height: '100vh' }}></div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// // import React, { useState, useEffect, useRef } from 'react';
// // import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import vtk from 'vtk.js/Sources/vtk';
// // import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
// // import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
// // import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';
// // import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
// // import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
// // import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData';
// // import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';

// // function App() {
// //   const [file, setFile] = useState(null);
// //   const [prediction, setPrediction] = useState(null);
// //   const [error, setError] = useState(null);
// //   const renderWindowRef = useRef(null);
// //   const renderWindow = useRef(null);
// //   const interactor = useRef(null);

// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!file) {
// //       console.error('No file selected');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('file', file);

// //     try {
// //       console.log('Sending file to server...');
// //       const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
// //       console.log('Response received:', response);
// //       setPrediction(response.data.prediction);
// //       setError(null);
// //       render3DVolume(response.data.prediction);
// //     } catch (error) {
// //       console.error('Error uploading file:', error);
// //       setPrediction(null);
// //       setError('Error uploading file: ' + (error.response ? error.response.data.error : error.message));
// //     }
// //   };

// //   const render3DVolume = (data) => {
// //     // Assuming `data` is a 3D array
// //     const imageData = vtkImageData.newInstance();
// //     const dimensions = [data.length, data[0].length, data[0][0].length];
// //     const flatData = new Float32Array(data.flat(2)); // Flatten the 3D array

// //     imageData.setDimensions(dimensions);
// //     imageData.getPointData().setScalars(vtkDataArray.newInstance({
// //       name: 'scalars',
// //       values: flatData,
// //       numberOfComponents: 1
// //     }));

// //     const volumeMapper = vtkVolumeMapper.newInstance();
// //     volumeMapper.setInputData(imageData);

// //     const volume = vtkVolume.newInstance();
// //     volume.setMapper(volumeMapper);

// //     const renderer = vtkRenderer.newInstance();
// //     const renderWindowInstance = vtkRenderWindow.newInstance();
// //     renderWindowInstance.addRenderer(renderer);

// //     // Initialize the interactor
// //     interactor.current = vtkRenderWindowInteractor.newInstance();
// //     interactor.current.setView(renderWindowInstance.getViews()[0]); // Use setView instead of setRenderWindow

// //     renderer.addVolume(volume);
// //     renderer.resetCamera();

// //     // Ensure renderWindowRef is valid before appending
// //     if (renderWindowRef.current) {
// //       renderWindow.current = renderWindowInstance;
// //       renderWindowRef.current.appendChild(renderWindowInstance.getContainer());
// //       renderWindowInstance.render();
// //       interactor.current.initialize();
// //       interactor.current.start();
// //     } else {
// //       console.error('Render window reference is null');
// //     }
// //   };
// //   useEffect(() => {
// //     return () => {
// //       if (interactor.current) {
// //         interactor.current.dispose();
// //       }
// //     };
// //   }, []);

// //   return (
// //     <div className="container mt-5">
// //       <h1>File Upload and 3D Prediction Visualization</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div className="mb-3">
// //           <input type="file" className="form-control" onChange={handleFileChange} />
// //         </div>
// //         <button type="submit" className="btn btn-primary">Upload and Predict</button>
// //       </form>
// //       {error && (
// //         <div className="alert alert-danger mt-3">
// //           <h4>Error:</h4>
// //           <pre>{error}</pre>
// //         </div>
// //       )}
// //       {prediction && (
// //         <div>
// //           <h2>3D Visualization:</h2>
// //           <div ref={renderWindowRef} style={{ width: '800px', height: '600px' }}></div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import * as THREE from 'three';

// function App() {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (prediction && canvasRef.current) {
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//       const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       camera.position.z = 5;

//       // Create a 3D mesh from the prediction data
//       const geometry = new THREE.BufferGeometry();
//       const vertices = [];
//       const indices = [];

//       // Iterate over the prediction data and create vertices and indices
//       for (let i = 0; i < prediction.length; i++) {
//         for (let j = 0; j < prediction[i].length; j++) {
//           for (let k = 0; k < prediction[i][j].length; k++) {
//             const value = prediction[i][j][k];
//             if (value === 1) {
//               vertices.push(i, j, k);
//               if (i < prediction.length - 1 && prediction[i + 1][j][k] === 1) {
//                 indices.push(vertices.length - 1, vertices.length);
//               }
//               if (j < prediction[i].length - 1 && prediction[i][j + 1][k] === 1) {
//                 indices.push(vertices.length - 1, vertices.length);
//               }
//               if (k < prediction[i][j].length - 1 && prediction[i][j][k + 1] === 1) {
//                 indices.push(vertices.length - 1, vertices.length);
//               }
//             }
//           }
//         }
//       }

//       geometry.setIndex(new THREE.Uint16BufferAttribute(indices, 1));
//       geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

//       const material = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
//       const mesh = new THREE.Mesh(geometry, material);

//       scene.add(mesh);

//       // Animation loop
//       const animate = () => {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//       };

//       animate();
//     }
//   }, [prediction]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       console.error('No file selected');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Response:', response);
//       console.log(response.data.prediction)
//       setPrediction(response.data.prediction); // Assuming this is the 3D array of 0s and 1s
//       setError(null);
//     } catch (error) {
//       setPrediction(null);
//       setError('Error uploading file: ' + (error.response ? error.response.data.error : error.message));
//     }
//   };

//   return (
//     <div className="App">
//       <h1>File Upload and Prediction</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload and Predict</button>
//       </form>
//       {error && (
//         <div>
//           <h2>Error:</h2>
//           <pre>{error}</pre>
//         </div>
//       )}
//       {prediction && (
//         <div>
//           <h2>Prediction:</h2>
//           <canvas ref={canvasRef} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// src/App.jsx

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './index.css';

// function App() {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);
//   const canvasRef = useRef(null);
//   const sceneRef = useRef(null);

//   useEffect(() => {
//     if (prediction && canvasRef.current) {
//       // Initialize Three.js renderer
//       const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       // Initialize scene
//       const scene = new THREE.Scene();
//       sceneRef.current = scene;

//       // Initialize camera
//       const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//       camera.position.z = 5;

//       // Initialize controls
//       const controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableDamping = true;
//       controls.dampingFactor = 0.25;
//       controls.enableZoom = true;

//       // Create a geometry for the 3D volume
//       const dimensions = [prediction.length, prediction[0].length, prediction[0][0].length];
//       const geometry = new THREE.BoxGeometry(dimensions[0], dimensions[1], dimensions[2]);

//       // Create a texture from the 3D array
//       const size = dimensions[0] * dimensions[1] * dimensions[2];
//       const data = new Float32Array(size);
//       for (let z = 0; z < dimensions[2]; z++) {
//         for (let y = 0; y < dimensions[1]; y++) {
//           for (let x = 0; x < dimensions[0]; x++) {
//             data[z * dimensions[1] * dimensions[0] + y * dimensions[0] + x] = prediction[x][y][z];
//           }
//         }
//       }

//       const texture = new THREE.DataTexture3D(data, dimensions[0], dimensions[1], dimensions[2]);
//       texture.format = THREE.RedFormat;
//       texture.type = THREE.FloatType;
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;
//       texture.encoding = THREE.LinearEncoding;

//       // Create a material with the texture
//       const material = new THREE.MeshBasicMaterial({ map: texture });

//       // Create a mesh and add it to the scene
//       const mesh = new THREE.Mesh(geometry, material);
//       scene.add(mesh);

//       // Animation loop
//       const animate = () => {
//         requestAnimationFrame(animate);
//         controls.update();
//         renderer.render(scene, camera);
//       };

//       animate();
//     }
//   }, [prediction]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       console.error('No file selected');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setPrediction(response.data.prediction); // Assuming this is the 3D array of 0s and 1s
//       setError(null);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setPrediction(null);
//       setError('Error uploading file: ' + (error.response ? error.response.data.error : error.message));
//     }
//   };

//   return (
//     <div className="App">
//       <h1>File Upload and Prediction</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload and Predict</button>
//       </form>
//       {error && (
//         <div>
//           <h2>Error:</h2>
//           <pre>{error}</pre>
//         </div>
//       )}
//       <div>
//         <h2>3D Visualization:</h2>
//         <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }}></canvas>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Home from "./pages/Home";
// import Products from "./pages/Products";
// const App = () => {
//   return (
//     <>
//       <Products/>
//       {/* <Home/> */}

//     </>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Threed from "./pages/Threed";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/threed" element={<Threed />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
