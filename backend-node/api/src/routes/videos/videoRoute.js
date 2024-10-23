const VideoController = require("../../controllers/videos/videoController");

const DEFAULT_ROUTE = "";

class VideoRoute {
  constructor(router) {
    this.controller = new VideoController();

    router
      .route(DEFAULT_ROUTE + '/upload')
      .post((req, res) => this.controller.upload(req, res))

    router
      .route(DEFAULT_ROUTE + '/:id')
      .get((req, res) => this.controller.get(req, res))
  }
}

module.exports = VideoRoute;