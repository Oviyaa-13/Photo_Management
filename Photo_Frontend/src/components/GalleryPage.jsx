import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:7000/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handlePhotoClick = (photoId) => {
    if (!token) {
      setModalOpen(true);
    } else {
      navigate(`/photo/${photoId}`);
    }
  };

  useEffect(() => {
    if (!token) {
      setModalOpen(true);
    } else {
      fetchPhotos();
    }
  }, [token]);

  return (
    <div>
      {modalOpen && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
      <div className="gallery">
        {photos.map(photo => (
          <div 
            key={photo._id} 
            className="photo-card" 
            onClick={() => handlePhotoClick(photo._id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="imageContainer">
              <img src={`http://localhost:7000${photo.imageUrl}`} alt={photo.title} className="image" />
            </div>
            <h3 className="photo-title">{photo.title}</h3>
            <p className="photo-description">{photo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
