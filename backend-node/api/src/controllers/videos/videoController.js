const VideoData = require('../../models/videosModel');
const axios = require('axios')

class VideoController {
  async upload(req, res) {
    try {
      const { buffer } = req.file;
      const videoId = req.body.videoId;

      const response = await axios.post('http://localhost:5000/process-video', 
        buffer,
        {
          headers: {
            "Content-Type": "application/octet-stream"
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        }
      );

      const { duration, resolution, processing_time } = response.data;

      const video = new VideoData({
        videoId,
        duration,
        resolution,
        results: 'Processed in ${processing_time} seconds'
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

module.exports = VideoController();