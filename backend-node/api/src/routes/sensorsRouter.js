const express = require("express");
const SensorRoute = require("./sensors/sensorsRoute");

const DEFAULT_ROUTE = "/sensor";

class SensorRouter {
  constructor(app) {
    const router = express.Router();

    new SensorRoute(router);

    app.use(DEFAULT_ROUTE, router);
  }
}

module.exports = SensorRouter;
