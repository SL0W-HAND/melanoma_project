"use client";

import React, { useState, useRef, useEffect } from 'react';


const Detection = () => {
  const setSelectedFile = useState<File | null>(null)[1];
  const [preview, setPreview] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prediction, setPrediction] = useState<{ type_of_lesion: string, cancer_diagnosed: string, confidence: number } | null>(null);

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
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append('image', blob, 'cropped_image.png');
          const url = 'http://165.227.99.181:8000/first_model';
          try {
            const response = await fetch(url, {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPrediction(data); // Store the prediction result
          } catch (error) {
            console.error('Error fetching data:', error);
            alert('There was an issue with the connection. Please try again later.');
          }
        }
      }, 'image/png');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setPrediction(null);
  };

  useEffect(() => {
    if (imgRef.current && canvasRef.current) {
      const image = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    }
  }, [preview]);

  return (
    <section className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
      <div className="lg:col-span-6 lg:col-start-4">
        {!prediction && <h2 className="text-2xl font-bold mb-4 text-center">Upload an Image</h2>}
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
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                >
                  Diagnose
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