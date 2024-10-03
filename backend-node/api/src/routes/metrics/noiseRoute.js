const NoiseController = require("../../controllers/metrics/noiseController");

const DEFAULT_ROUTE = "/noise";

class NoiseRoute {
  constructor(router) {
    this.controller = new NoiseController();

    router
      .route(DEFAULT_ROUTE)
      .get((req, res) => this.controller.get(req, res))
      .post((req, res) => this.controller.post(req, res))
      .delete((req, res) => this.controller.del(req, res));
  }
}

module.exports = NoiseRoute;
