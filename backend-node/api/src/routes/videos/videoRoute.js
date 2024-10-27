const VideoController = require("../../controllers/videos/videoController");

const DEFAULT_ROUTE = "";

class VideoRoute {
  constructor(router, upload) {
    this.controller = new VideoController();

    router
      .route(DEFAULT_ROUTE + '/upload')
      .post(upload.single('video'), (req, res) => this.controller.upload(req, res))

    router
      .route(DEFAULT_ROUTE)
      .get((req, res) => this.controller.get(req, res))

    router
      .route(DEFAULT_ROUTE + '/callback')
      .post((req, res) => this.controller.update(req, res))
  }
}

module.exports = VideoRoute;