const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    duration: { type: Number, required: true },
    resolution: { type: String, required: true },
    method: { type: String, required: true },
    results: { type: String, required: true },
  }).index({ videoId: 1 });
  
  module.exports = mongoose.model('Video', videoSchema);