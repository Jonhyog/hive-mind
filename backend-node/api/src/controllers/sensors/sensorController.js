const SensorData = require("../../models/sensorsModel");
const MetricsData = require("../../models/metricsModel");

class SensorController {
  async get(req, res) {
    const { hiveId, metricType } = req.query;

    try {
      let filter = {};
      if (hiveId) {
        filter.hiveId = { hiveId };
      }

      if (metricType) {
        filter.metricType = { metricType: { $in: [metricType] } };
      }

      const filterValues = Object.values(filter);
      const conditions = filterValues.length > 0 ? { $and: filterValues } : {};

      console.log(req.params);

      const data = await MetricsData.aggregate([
        {
          $match: conditions,
        },
        {
          $group: {
            _id: "$sensorId",
            metricsType: {
              $addToSet: "$metricType",
            },
          },
        },
      ]);

      data.forEach((element) => {
        element.sensorId = element._id;
        delete element._id;
      });

      for (const element of data) {
        try {
          const [queryData] = await SensorData.find({
            sensorId: element.sensorId,
          });
          element.description = queryData.description;
        } catch (error) {
          console.error("Erro ao buscar sensor:", error);
        }
      }

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async post(req, res) {
    const { sensorId, hiveId, metric, description } = req.body;
    const newSensorData = new SensorData({
      sensorId,
      hiveId,
      metric,
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

module.exports = SensorController;
