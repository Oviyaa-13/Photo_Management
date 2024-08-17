const Photo = require('../models/photoModel');

const uploadPhoto = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const newPhoto = new Photo({
      title,
      description,
      imageUrl,
    });

    const savedPhoto = await newPhoto.save();
    res.status(201).json(savedPhoto);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading photo', error: err.message });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch photos', error: err.message });
  }
};

const getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.json(photo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch photo', error: err.message });
  }
};

module.exports = {
  uploadPhoto,
  getAllPhotos,
  getPhotoById,
};
