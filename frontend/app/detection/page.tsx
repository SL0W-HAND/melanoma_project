"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as ort from 'onnxruntime-web';

// Configure ONNX Runtime to use WASM backend - serve from local public folder
ort.env.wasm.wasmPaths = '/onnx/';

const CLASSES = [
  'Melanocytic Nevi (nv)', 'Benign Keratosis-like Lesions (bkl)',
  'Dermatofibroma (df)', 'Melanoma (mel)', 'Vascular Lesions (vasc)',
  'Basal Cell Carcinoma (bcc)', 'Actinic Keratoses and Intraepithelial Carcinoma (akiec)'
];
const CLASSES_CANCER = ['Non Cancerous', 'Cancerous'];
const isCancerous = (idx: number) => [3, 5, 6].includes(idx) ? 1 : 0;

export const dynamic = 'force-dynamic';

const Detection = () => {
  const setSelectedFile = useState<File | null>(null)[1];
  const [preview, setPreview] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prediction, setPrediction] = useState<{ type_of_lesion: string; cancer_diagnosed: string; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const sessionRef = useRef<ort.InferenceSession | null>(null);

  // Load model on mount
  const loadModel = useCallback(async () => {
    if (sessionRef.current) return sessionRef.current;
    
    setModelLoading(true);
    try {
      const session = await ort.InferenceSession.create('/model.onnx', {
        executionProviders: ['wasm'],
      });
      sessionRef.current = session;
      console.log('ONNX model loaded successfully');
      return session;
    } catch (error) {
      console.error('Failed to load ONNX model:', error);
      throw error;
    } finally {
      setModelLoading(false);
    }
  }, []);

  useEffect(() => {
    loadModel();
  }, [loadModel]);

  const preprocessImage = (canvas: HTMLCanvasElement): Float32Array => {
    // Create a temporary canvas for resizing to 128x128
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 128;
    tempCanvas.height = 128;
    const tempCtx = tempCanvas.getContext('2d')!;
    
    // Draw and resize the image
    tempCtx.drawImage(canvas, 0, 0, 128, 128);
    
    // Get pixel data
    const imageData = tempCtx.getImageData(0, 0, 128, 128);
    const data = imageData.data;
    
    // Convert to NCHW format (channels first) and normalize
    const floatData = new Float32Array(3 * 128 * 128);
    for (let i = 0; i < 128 * 128; i++) {
      floatData[i] = data[i * 4] / 255.0;                     // R channel
      floatData[i + 128 * 128] = data[i * 4 + 1] / 255.0;     // G channel
      floatData[i + 2 * 128 * 128] = data[i * 4 + 2] / 255.0; // B channel
    }
    
    return floatData;
  };

  const runInference = async (canvas: HTMLCanvasElement) => {
    setIsLoading(true);
    try {
      const session = await loadModel();
      if (!session) throw new Error('Model not loaded');

      const floatData = preprocessImage(canvas);
      const inputName = session.inputNames[0];
      const tensor = new ort.Tensor('float32', floatData, [1, 3, 128, 128]);

      const output = await session.run({ [inputName]: tensor });
      const predictionData = output[session.outputNames[0]].data as Float32Array;

      // Find max index
      let maxIdx = 0;
      let maxVal = predictionData[0];
      for (let i = 1; i < predictionData.length; i++) {
        if (predictionData[i] > maxVal) {
          maxVal = predictionData[i];
          maxIdx = i;
        }
      }

      setPrediction({
        type_of_lesion: CLASSES[maxIdx],
        cancer_diagnosed: CLASSES_CANCER[isCancerous(maxIdx)],
        confidence: Math.round(maxVal * 100)
      });
    } catch (error) {
      console.error('Inference error:', error);
      alert('There was an issue running the model. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canvasRef.current) {
      await runInference(canvasRef.current);
    }
  };
  

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setPrediction(null);
  };

  useEffect(() => {
    if (imgRef.current && canvasRef.current && preview) {
      const image = imgRef.current;
      const canvas = canvasRef.current;
      
      // Wait for image to load
      image.onload = () => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
      };
      
      // If image is already loaded
      if (image.complete) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, [preview]);

  return (
    <section className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
      <div className="lg:col-span-6 lg:col-start-4">
        {!prediction && <h2 className="text-2xl font-bold mb-4 text-center">Upload an Image</h2>}
        {modelLoading && (
          <div className="text-center mb-4 text-gray-600">
            <p>Loading AI model...</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
          {!prediction && (
            <>
              <div 
                className="mb-4 p-6 border-2 border-dashed border-gray-300 rounded-lg w-full flex flex-col items-center justify-center cursor-pointer hover:border-blue-500"
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden"
                  id="fileInput"
                />
                <p className="text-gray-500">Drag & drop an image here, or click to select one</p>
              </div>
              {preview && (
                <>
                  <img ref={imgRef} src={preview} alt="Preview" style={{ display: 'none' }} />
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                </>
              )}
              <button 
                type="button" 
                onClick={() => document.getElementById('fileInput')?.click()} 
                className="px-4 py-2 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 mb-4"
              >
                Select File
              </button>
              {preview && (
                <button 
                  type="submit" 
                  disabled={isLoading || modelLoading}
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Analyzing...' : 'Diagnose'}
                </button>
              )}
            </>
          )}
        </form>
        {prediction && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Prediction Result</h3>
            <p><strong>Type of Lesion:</strong> {prediction.type_of_lesion}</p>
            <p><strong>Cancer Diagnosed:</strong> {prediction.cancer_diagnosed}</p>
            <p><strong>Confidence:</strong> {prediction.confidence}%</p>
            <button 
              onClick={handleReset} 
              className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
            >
              Make Another Diagnosis
            </button>
            <div className="mt-4 p-4 bg-yellow-100 rounded-lg shadow-md">
              <p className="text-yellow-700"><strong>Disclaimer:</strong> This is only a prediction from an AI model. Please verify the results with a medical professional.</p>
            </div>
          </div>
        )}
        {preview && (
          <img 
            src={preview} 
            alt="Image Preview" 
            className="mt-4 max-w-full h-auto rounded-md shadow-md"
          />
        )}
      </div>
    </section>
  );
};

export default Detection;