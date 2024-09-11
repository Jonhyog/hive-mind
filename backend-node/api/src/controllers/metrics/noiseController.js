const SensorData = require('../../models/noiseData')
const BaseController = require('./baseController')

class NoiseController extends BaseController{

    constructor(){
        super(SensorData)
    }

}

module.exports = NoiseController
