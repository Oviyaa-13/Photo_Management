import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PhotoDetails = () => {
  const { id } = useParams(); 
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/photos/${id}`);
        setPhoto(response.data);
      } catch (error) {
        console.error('Error fetching photo details:', error);
      }
    };

    fetchPhotoDetails();
  }, [id]);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <button onClick={() => navigate('/gallery')} className="back-button">
      Back to Gallery
    </button>
    <div className="photo-details-container">
      <h2>{photo.title}</h2>
      <img src={`http://localhost:7000${photo.imageUrl}`} alt={photo.title} className="full-image" />
      <p>{photo.description}</p>
    </div>
  </div>
  );
};

export default PhotoDetails;
