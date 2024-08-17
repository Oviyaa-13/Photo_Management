import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import GalleryPage from './components/GalleryPage';
import UploadPage from './components/UploadPage';
import PhotoDetails from './components/PhotoDetails';
import Header from './components/Header';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:7000/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<UploadPage onPhotoUploaded={fetchPhotos} />} />
          <Route path="/gallery" element={<GalleryPage photos={photos} />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
