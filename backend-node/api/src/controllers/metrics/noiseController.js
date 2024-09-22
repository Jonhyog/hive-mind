const BaseController = require('./baseController')

const METRIC_TYPE = "noise"

class NoiseController extends BaseController{

    constructor(){
        super(METRIC_TYPE)
    }

}

module.exports = NoiseController
