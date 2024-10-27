const VideoData = require('../../models/videosModel');

class VideoController {
  async upload(req, res) {
    try {
      const { detector_type } = req.body;
      const videoFile = req.file;

      if (!videoFile) {
        return res.status(400).json({ message: "No video file uploaded "});
      }

      const filename = videoFile.originalname
      const status_init = "Sending"
      const videoData = new VideoData({
        filename,
        duration: 0,
        resolution: "Pending",
        detector_type,
        processing_time: 0,
        events: [],
        status: status_init,
      });
      await videoData.save();

      const videoId = videoData._id

      const formData = new FormData();
      formData.append('file', new Blob([videoFile.buffer]), videoFile.originalname);
      formData.append('detector_type', detector_type);
      formData.append('video_id', videoId)

      const response = await fetch('http://backend-python:3000/process-video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        await VideoData.findByIdAndDelete(videoId);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      if (responseData.error) {
        await VideoData.findByIdAndDelete(videoId);
        return res.status(442).json({ message: responseData.error })
      }

      const { message, video_id, status } = responseData
      if (video_id !== videoId.toString()) {
        await VideoData.findByIdAndDelete(videoId);
        return res.status(400).json({ message: `ID mismatch: expected ${videoId}, received ${video_id}`})
      }

      await VideoData.findByIdAndUpdate(videoId, { status });

      res.status(201).json({ message: "Video processing", responseData });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

  async get(req, res) {
    try {
      const { id } = req.query;

      let filter = {};
      if (id) {
        filter._id = id;
      }

      const data = await VideoData.find(filter);

      if (id && data.length === 0) {
        return res.status(404).json({ message: "Video not found." });
      }

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const { video_id, filename, duration, resolution, 
        processing_time, events, status } = req.body;
      const video = await VideoData.findByIdAndUpdate(
        video_id,
        { filename, duration, resolution, processing_time, events, status },
        { new: true });
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      res.status(200).json(video);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = VideoController;