const SensorData = require('../../models/metricsModel')

class HiveController{
    
    constructor(){
    
    }
    async get(req, res) {
        res.send("GET")
    }
    async post(req, res) {
        res.send("POST")
    }
    async del(req, res) {
        res.send("DELETE")
    }

}

module.exports = HiveController
