import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import "../App.css";

const UploadPage = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!token) {
      setModalOpen(true);
    }
  }, [token]);

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setModalOpen(true);
      return;
    }

    if (photoFile && title) {
      const formData = new FormData();
      formData.append('photo', photoFile);
      formData.append('title', title);
      formData.append('description', description);

      try {
        await axios.post('http://localhost:7000/photos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });

        setPhotoFile(null);
        setTitle('');
        setDescription('');
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; 
        }

        navigate('/');
      } catch (error) {
        if (error.response && error.response.data.error === 'Invalid or expired token') {
          setErrorMessage('Your session has expired. Please log in again.');
          localStorage.removeItem('token');
          setModalOpen(true);
        } else {
          console.error('Error uploading photo:', error);
        }
      }
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Photo</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef} 
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Upload</button>
      </form>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default UploadPage;
