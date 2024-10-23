const express = require("express");
const VideoRoute = require("./videos/videoRoute");

const DEFAULT_ROUTE = "/video";

class VideoRouter {
  constructor(app) {
    const router = express.Router();

    new VideoRoute(router);

    app.use(DEFAULT_ROUTE, router);
  }
}

module.exports = VideoRouter;
