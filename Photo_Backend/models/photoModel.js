const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
  {
  title: 
  { type: String, 
    required: true },
  description:
   { type: String },
  imageUrl: 
  { type: String, 
    required: true },
  uploadedAt:
   { type: Date, 
    default: Date.now },
}
);

module.exports = mongoose.model('Photo', photoSchema);

