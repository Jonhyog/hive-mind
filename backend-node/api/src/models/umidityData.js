const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    sensorId: { type: String, required: true },
    value: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
  }).index({ timestamp: 1 });
  
const SensorData = mongoose.model('UmidityData', schema);

module.exports = SensorData;