const SensorController = require("../../controllers/sensors/sensorController")

const DEFAULT_ROUTE = ""

class SensorRoute{

    constructor(router){

        this.controller = new SensorController()

        router.route(DEFAULT_ROUTE)
            .get((req, res) => this.controller.get(req, res))
            .post((req, res) => this.controller.post(req, res))
            .delete((req, res) => this.controller.del(req, res));
    }
}

module.exports = SensorRoute
