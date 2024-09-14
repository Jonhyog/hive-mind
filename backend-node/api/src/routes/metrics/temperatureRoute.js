const TemperatureController = require("../../controllers/metrics/temperatureController")

const DEFAULT_ROUTE = "/temperature"

class TemperatureRoute{

    constructor(router){

        this.controller = new TemperatureController()

        router.route(DEFAULT_ROUTE)
            .get((req, res) => this.controller.get(req, res))
            .post((req, res) => this.controller.post(req, res))
            .delete((req, res) => this.controller.del(req, res));
    }

}

module.exports = TemperatureRoute
