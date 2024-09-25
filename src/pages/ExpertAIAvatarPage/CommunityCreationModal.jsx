import React, { useState, useEffect } from "react";
import { FiUpload, FiTrash } from 'react-icons/fi';
import axios from 'axios';
import { useLogin } from '../../LoginContext';

const MultiItemExtractor = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csvDataAvailable, setCsvDataAvailable] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { username } = useLogin();

  // Function to fetch the processing status and CSV data availability
  const checkProcessingStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/${username}/csv_status`
      );
      const { processing, csv_data } = response.data;
      setIsProcessing(processing);
      setCsvDataAvailable(csv_data || null);
      
      // Continue polling if processing is still true
      if (processing) {
        setTimeout(checkProcessingStatus, 5000);  // Poll every 30 seconds
      }
    } catch (err) {
      console.error("Error fetching CSV status:", err);
      setError('Failed to fetch CSV status.');
    }
  };

  useEffect(() => {
    // Poll for CSV status after some time if extraction started
    if (isProcessing) {
      setTimeout(checkProcessingStatus, 5000);  // Wait 30 seconds before first poll
    }
  }, [isProcessing]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    previewImages(selectedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    previewImages(droppedFiles);
  };

  const previewImages = (selectedFiles) => {
    const filePreviews = selectedFiles.map(file => {
      return { file, url: URL.createObjectURL(file) };
    });
    setFiles(prevFiles => [...prevFiles, ...filePreviews]);
  };

  const removeImage = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const extractData = async () => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    files.forEach((fileObj, index) => {
      formData.append('menuImages', fileObj.file);
    });
    // alert(username);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Menu_Image_to_CSV?user_id=${username}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Set isProcessing to true to start polling after some delay
      setIsProcessing(true);

      // Delay the first status check by 30 seconds to give the process time to start
      setTimeout(checkProcessingStatus, 30000);
      
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during extraction');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!csvDataAvailable) return;
    
    const blob = new Blob([csvDataAvailable], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'menu_items.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="pt-[100px] font-[Poppins] justify-center items-center w-full pr-[150px] px-[70px]">
      <div className='flex flex-row justify-between items-center'>
        <h1 className="text-3xl font-bold mb-2">Multi Item Extractor</h1>
        <div className="mt-4 text-right">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Credits remaining: 99
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        Upload menu images to extract items, prices, and accommodations!
      </p>

      <div 
        className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center cursor-pointer bg-blue-50"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <FiUpload className="mx-auto text-4xl text-blue-500 mb-4" />
        <p className="text-blue-500 font-medium">
          Drag and drop or click to upload menu images
        </p>
        <p className="text-sm text-gray-500 mt-2">
          PNG, JPG or JPEG up to 10MB each
        </p>
        <input
          id="fileInput"
          type="file"
          multiple
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6 max-h-64 overflow-y-auto border border-gray-200 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            {files.map((fileObj, index) => (
              <div key={index} className="relative group">
                <img
                  src={fileObj.url}
                  alt={`Preview ${index}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <p className="mt-2 text-sm text-center truncate">{fileObj.file.name}</p>
                
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        className={`mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 ${isLoading || files.length === 0 || isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={extractData}
        disabled={isLoading || files.length === 0 || isProcessing}
      >
        {isLoading ? 'EXTRACTING...' : 'EXTRACT DATA'}
      </button>

      {isProcessing && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          Processing your data. Please wait...
        </div>
      )}

      {csvDataAvailable && (
        <button 
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
          onClick={downloadCSV}
        >
          DOWNLOAD CSV
        </button>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default MultiItemExtractor;
