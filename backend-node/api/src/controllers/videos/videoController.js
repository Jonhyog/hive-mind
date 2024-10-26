const VideoData = require('../../models/videosModel');

class VideoController {
  async upload(req, res) {
    try {
      const { detector_type } = req.body;
      const videoFile = req.file;

      if (!videoFile) {
        return res.status(400).json({ message: "No video filed uploaded "});
      }

      const response = await fetch('http://localhost:5000/process-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'detector-type': detector_type
        },
        body: videoFile.buffer,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const { duration, resolution, processing_time, events } = await response.json();

      const videoData = new VideoData({
        duration,
        resolution,
        detector_type,
        processing_time,
        events
      });
      await videoData.save();

      res.status(201).json({ message: "Video processed and saved", videoData });
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