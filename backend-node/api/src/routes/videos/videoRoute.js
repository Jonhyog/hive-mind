const VideoController = require("../../controllers/videos/videoController");
const multer = require('multer');

const DEFAULT_ROUTE = "";

class VideoRoute {
  constructor(router) {
    this.controller = new VideoController();

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    router
      .route(DEFAULT_ROUTE + '/upload')
      .post(upload.single('video'), (req, res) => this.controller.upload(req, res));

    router
      .route(DEFAULT_ROUTE + '/:id')
      .get((req, res) => this.controller.get(req, res))
  }
}

module.exports = VideoRoute;