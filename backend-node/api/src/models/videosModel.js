const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    duration: { type: Number, required: true },
    resolution: { type: String, required: true },
    method: { type: String, required: true },
    results: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Video', videoSchema);