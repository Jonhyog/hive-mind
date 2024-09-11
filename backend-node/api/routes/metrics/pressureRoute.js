const PressureController = require("../../controllers/metrics/pressureController")

const DEFAULT_ROUTE = "/pressure"

class PressureRoute{

    constructor(router){

        this.controller = new PressureController()

        router.route(DEFAULT_ROUTE)
            .get((req, res) => this.controller.get(req, res))
            .put((req, res) => this.controller.put(req, res))
            .delete((req, res) => this.controller.del(req, res));
    }
}

module.exports = PressureRoute
