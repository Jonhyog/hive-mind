const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    sensorId: { type: String, required: true, unique: true },
    description: { type: String, required: false },
}).index({ sensorId: 1 });

const Sensor = mongoose.model('Sensors', sensorSchema);

module.exports = Sensor;
