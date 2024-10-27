const mongoose = require('mongoose');

const crossingEventSchema = new mongoose.Schema({
    direction: { type: String, required: true},
    timestamp: { type: Number, required: true}
});

const videoSchema = new mongoose.Schema({
    filename: {type: String, required: true },
    duration: { type: Number, required: true },
    resolution: { type: String, required: true },
    detector_type: { type: String, required: true },
    processing_time: { type: Number, required: true},
    events: { type: [crossingEventSchema], required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Video', videoSchema);