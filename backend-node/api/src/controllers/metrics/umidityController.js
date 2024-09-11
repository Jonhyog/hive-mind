const SensorData = require('../../models/umidityData')
const BaseController = require('./baseController')

class UmidityController extends BaseController{

    constructor(){
        super(SensorData)
    }

}

module.exports = UmidityController
