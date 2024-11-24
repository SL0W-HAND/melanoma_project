import React, { useState } from 'react';

const ImageUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFile) {
            // Handle the file upload logic here
            console.log('File uploaded:', selectedFile);
        }
    };

    return (
        <section className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div className="lg:col-span-6 lg:col-start-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Upload an Image</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
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
                    />
                    <p className="text-gray-500">Drag & drop an image here, or click to select one</p>
                </div>
                <button 
                    type="button" 
                    onClick={() => document.querySelector('input[type="file"]')?.click()} 
                    className="px-4 py-2text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 mb-4"
                >
                    Select File
                </button>
                <button 
                type="submit" 
                className="px-4 py-2text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                >
                Diagnose
                </button>
            </form>
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

export default ImageUpload;