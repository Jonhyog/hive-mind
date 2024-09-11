const SensorData = require('../../models/pressureData')
const BaseController = require('./baseController')

class PressureController extends BaseController{

    constructor(){
        super(SensorData)
    }

}

module.exports = PressureController
