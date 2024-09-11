const SensorData = require('../../models/temperatureData');
const BaseController = require('./baseController');


class TemperatureController extends BaseController{

    constructor(){
        super(SensorData)
    }
}

module.exports = TemperatureController
