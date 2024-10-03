const SensorData = require("../../models/hivesModel");

class HiveController {
  async get(req, res) {
    const { hiveId, location, description } = req.query;

    try {
      let filter = {};
      if (hiveId) {
        filter.hiveId = hiveId;
      }
      if (location) {
        filter.location = location;
      }
      if (description) {
        filter.description = description;
      }

      const data = await SensorData.find(filter);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async post(req, res) {
    const { hiveId, location, description } = req.query;
    const newSensorData = new SensorData({
      hiveId,
      location,
      description,
    });

    try {
      const data = await newSensorData.save();
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  async del(req, res) {
    const { sensorId } = req.params;

    try {
      const deletedData = await SensorData.findByIdAndDelete(sensorId);
      if (!deletedData) {
        return res.status(404).json({ message: "Sensor data not found" });
      }
      res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = HiveController;
