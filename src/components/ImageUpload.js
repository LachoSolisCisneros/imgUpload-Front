import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        console.log('Selected file:', event.target.files[0]); 
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:4000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadStatus('Image uploaded successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus('Error uploading image');
        }
    };

    return (
        <div className="image-upload-container">
            <h2>Upload an Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            <p>{uploadStatus}</p>
        </div>
    );
};

export default ImageUpload;
