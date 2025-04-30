import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Ensure your CSS styles are in place

const MAX_FILE_SIZE_MB = 10;

function App() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size / (1024 * 1024) <= MAX_FILE_SIZE_MB) {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage(`File size exceeds ${MAX_FILE_SIZE_MB}MB.`);
    }
  };

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !category) {
      setMessage('Please select a file and category.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      setMessage(response.data.message);
      setUploadedFile(file.name);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const resetForm = () => {
    setFile(null);
    setCategory('');
    setMessage('');
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.size / (1024 * 1024) <= MAX_FILE_SIZE_MB) {
      setFile(droppedFile);
      setMessage('');
    } else {
      setMessage(`File size exceeds ${MAX_FILE_SIZE_MB}MB.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Upload File</h1>

        <form onSubmit={handleSubmit}>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-blue-500 p-4 rounded-md mb-4 text-center cursor-pointer"
          >
            <p className="mb-2">Drag & drop a file here</p>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg"
              className="w-full"
            />
          </div>

          {file && file.type.startsWith('image/') && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="mb-4 max-h-40 mx-auto rounded shadow"
            />
          )}

          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-500"
          >
            <option value="">Select Category</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="w-full bg-gray-600 hover:bg-gray-700 py-2 rounded text-white font-semibold"
            >
              Reset
            </button>
          </div>
        </form>

        {uploadProgress > 0 && (
          <div className="mt-4">
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-center text-sm mt-1">{uploadProgress}%</p>
          </div>
        )}

        {message && (
          <p className={`mt-4 text-center ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}

        {uploadedFile && (
          <p className="mt-2 text-center text-green-300">
            Last uploaded: <strong>{uploadedFile}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
