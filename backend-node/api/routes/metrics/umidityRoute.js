const UmidityController = require("../../controllers/metrics/umidityController")

const DEFAULT_ROUTE = "/umidity"

class UmidityRoute{

    constructor(router){

        this.controller = new UmidityController()

        router.route(DEFAULT_ROUTE)
            .get((req, res) => this.controller.get(req, res))
            .put((req, res) => this.controller.put(req, res))
            .delete((req, res) => this.controller.del(req, res));
    }
}

module.exports = UmidityRoute
