const SensorData = require('../../models/metricsModel')

class BaseController{
    
    constructor(metricType){
        
        this.sensorData = SensorData
        this.metricType = metricType

    }

    async get(req, res) {
        const { limit, 
            startDate, 
            endDate,
            sensorId,
            hiveId,
            value,
            timestamp
        } = req.query;

        try {

            let filter = {metricType : this.metricType};

            if(sensorId){
                filter.sensorId=sensorId;
            }
            if(hiveId){
                filter.hiveId = hiveId;
            }
            if(value){
                filter.value = value;
            }
            if(timestamp){
                filter.timestamp=timestamp;
            }

            if (startDate || endDate) {
                filter.timestamp = {};
                if (startDate) filter.timestamp.$gte = new Date(startDate);
                if (endDate) filter.timestamp.$lte = new Date(endDate);
            }

            const data = await this.sensorData.find(filter)
                .sort({ timestamp: -1 })
                .limit(parseInt(limit) || 0);

            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async post(req, res) {
        const { sensorId, hiveId, value, timestamp } = req.query;
        const newSensorData = new this.sensorData({
            sensorId,
            hiveId,
            metricType: this.metricType,
            value,
            timestamp
        });

        try {
            const savedData = await newSensorData.save();
            res.status(201).json(savedData);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async del(req, res) {
        const { id } = req.params;

        try {
            const deletedData = await this.sensorData.findByIdAndDelete(id);
            if (!deletedData) {
                return res.status(404).json({ message: 'Sensor data not found' });
            }
            res.status(200).json({ message: 'Deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}

module.exports = BaseController