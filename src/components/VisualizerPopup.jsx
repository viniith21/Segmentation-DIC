import React, { useEffect, useRef } from 'react';
import vtk from 'vtk.js/Sources/vtk';
import vtkNrrdReader from 'vtk.js/Sources/IO/Geometry/NrrdReader';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import vtkColorTransferFunction from 'vtk.js/Sources/Common/Core/ColorTransferFunction';
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkSmartVolumeMapper from 'vtk.js/Sources/Rendering/Core/SmartVolumeMapper';
import vtkLight from 'vtk.js/Sources/Rendering/Core/Light';

const VisualizerPopup = ({ nrrdUrl, onClose }) => {
    const renderWindowRef = useRef(null);

    useEffect(() => {
        const renderWindow = vtkRenderWindow.newInstance();
        const renderer = vtkRenderer.newInstance();
        renderWindow.addRenderer(renderer);
        const renderWindowInteractor = vtkRenderWindowInteractor.newInstance();
        renderWindowInteractor.setRenderWindow(renderWindow);

        // Load and visualize the NRRD file
        const loadNrrd = async () => {
            const reader = vtkNrrdReader.newInstance();
            await reader.setUrl(nrrdUrl);
            await reader.loadData();

            const imageData = reader.getOutputData();
            const scalarRange = imageData.getScalarRange();

            // Create color and opacity transfer functions
            const colorFunc = vtkColorTransferFunction.newInstance();
            colorFunc.addRGBPoint(scalarRange[0], 0.2, 0.1, 0.05); // Dark brown for min value
            colorFunc.addRGBPoint(scalarRange[1], 0.4, 0.2, 0.1); // Lighter brown for max value

            const opacityFunc = vtkPiecewiseFunction.newInstance();
            opacityFunc.addPoint(scalarRange[0], 0.0);
            opacityFunc.addPoint(scalarRange[1] * 0.5, 0.5);
            opacityFunc.addPoint(scalarRange[1], 1.0);

            // Set up the volume
            const volume = vtkVolume.newInstance();
            const volumeMapper = vtkSmartVolumeMapper.newInstance();
            volumeMapper.setInputData(imageData);
            volume.setMapper(volumeMapper);
            volume.getProperty().setColor(colorFunc);
            volume.getProperty().setScalarOpacity(opacityFunc);
            volume.getProperty().shadeOn();

            // Add the volume to the renderer
            renderer.addVolume(volume);
            renderer.setBackground(1.0, 1.0, 1.0); // White background
            renderer.resetCamera();

            // Add light
            const light = vtkLight.newInstance();
            light.setPosition(1, 1, 1);
            renderer.addLight(light);

            renderWindow.setSize(800, 600);
            renderWindow.render();

            // Continuous rotation
            const rotateVolume = () => {
                const rotationAngle = volume.getOrientation()[2] + 1; // Rotate by 1 degree
                volume.setOrientation(0, 0, rotationAngle);
                renderWindow.render();
                requestAnimationFrame(rotateVolume);
            };
            requestAnimationFrame(rotateVolume);
        };

        loadNrrd();

        return () => {
            renderWindowInteractor.getObserver().removeAllObservers();
            renderWindow.finalize();
        };
    }, [nrrdUrl]);

    return (
        <div>
            <div ref={renderWindowRef} style={{ width: '800px', height: '600px' }} />
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default VisualizerPopup;
