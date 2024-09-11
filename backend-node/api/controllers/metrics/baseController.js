class BaseController{

    constructor(sensorData){
        
        this.sensorData = sensorData

    }

    async get(req, res) {
        const { limit, startDate, endDate } = req.query;
        try {
            // Cria um filtro opcional por intervalo de tempo
            let filter = {};
            if (startDate || endDate) {
                filter.timestamp = {};
                if (startDate) filter.timestamp.$gte = new Date(startDate);
                if (endDate) filter.timestamp.$lte = new Date(endDate);
            }

            // Busca os dados com o filtro e ordena pelos mais recentes
            const data = await this.sensorData.find(filter)
                .sort({ timestamp: -1 }) // Ordena por timestamp decrescente
                .limit(parseInt(limit) || 0); // Limita os resultados, se 'limit' for fornecido

            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async put(req, res) {
        const { sensorId, value } = req.query;
        const newSensorData = new this.sensorData({
            sensorId,
            value
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