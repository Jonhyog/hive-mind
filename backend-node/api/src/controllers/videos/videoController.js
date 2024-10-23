const VideoData = require('../../models/videosModel');

class VideoController {
  async upload(req, res) {
    try {
      const { buffer } = req.file;
      const videoId = req.body.videoId;

      const response = await fetch('http://localhost:5000/process-video', {
        method: 'POST',
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": buffer.length
        },
        body: buffer
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const { duration, resolution, processing_time } = await response.json

      const video = new VideoData({
        videoId,
        duration,
        resolution,
        results: `Processed in ${processing_time} seconds`
      });
      await video.save();

      res.status(201).json({ message: "Video processed and saved", video });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

  async get(req, res) {
    try {
      const videoId = req.params.id;
      const video = await VideoData.findOne({ videoId });
    
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
    
      res.status(200).json(video);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = VideoController;