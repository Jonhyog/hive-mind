const BaseController = require("./baseController");

const METRIC_TYPE = "pressure";

class PressureController extends BaseController {
  constructor() {
    super(METRIC_TYPE);
  }
}

module.exports = PressureController;
