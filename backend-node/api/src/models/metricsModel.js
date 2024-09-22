const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    sensorId: { type: String, required: true },
    hiveId: { type: String, required: true },
    metricType: { type: String, required: true },
    value: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
  }).index({ timestamp: 1 });
  
const SensorData = mongoose.model('MetricsData', schema);

module.exports = SensorData;