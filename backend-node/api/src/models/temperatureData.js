const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    location: {type: String, required: false},
    sensorId: { type: String, required: true },
    value: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
  }).index({ timestamp: 1 });

  
const SensorData = mongoose.model('TemperatureData', schema);

module.exports = SensorData;