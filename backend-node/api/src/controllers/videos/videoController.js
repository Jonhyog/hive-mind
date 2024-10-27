const VideoData = require('../../models/videosModel');

class VideoController {
  async upload(req, res) {
    try {
      const { detector_type } = req.body;
      const videoFile = req.file;

      if (!videoFile) {
        return res.status(400).json({ message: "No video filed uploaded "});
      }

      const formData = new FormData();
      formData.append('file', new Blob([videoFile.buffer]), videoFile.originalname);
      formData.append('detector_type', detector_type);

      const response = await fetch('http://backend-python:3000/process-video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      if (responseData.error) {
        return res.status(442).json({ message: responseData.error })
      }
      const { filename, duration, resolution, processing_time, events } = responseData;

      const videoData = new VideoData({
        filename,
        duration,
        resolution,
        detector_type,
        processing_time,
        events
      });
      await videoData.save();

      res.status(201).json({ message: "Video processed and saved", responseData });
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