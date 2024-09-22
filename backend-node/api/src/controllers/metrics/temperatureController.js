const BaseController = require('./baseController');

const METRIC_TYPE = "temperature"

class TemperatureController extends BaseController{

    constructor(){
        super(METRIC_TYPE)
    }
}

module.exports = TemperatureController
