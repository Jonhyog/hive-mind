const BaseController = require('./baseController')

const METRIC_TYPE = "umidity"

class UmidityController extends BaseController{

    constructor(){
        super(METRIC_TYPE)
    }

}

module.exports = UmidityController
