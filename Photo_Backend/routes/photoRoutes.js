const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadPhoto, getAllPhotos, getPhotoById } = require('../controllers/photoController');
const auth = require('../middlewares/auth');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/', auth,upload.single('photo'), uploadPhoto); 
router.get('/', getAllPhotos); 
router.get('/:id', getPhotoById);

module.exports = router;
