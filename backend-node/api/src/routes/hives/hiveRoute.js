const HiveController = require("../../controllers/hives/hiveController")

const DEFAULT_ROUTE = ""

class HiveRoute{

    constructor(router){

        this.controller = new HiveController()

        router.route(DEFAULT_ROUTE)
            .get((req, res) => this.controller.get(req, res))
            .post((req, res) => this.controller.post(req, res))
            .delete((req, res) => this.controller.del(req, res));
    }
}

module.exports = HiveRoute
