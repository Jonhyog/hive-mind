export default {
  translations: {
    workspaces: {
      graphs: "Graphs",
      monitoring: "Video Monitoring",
      results: "Results",
      settings: "Settings",
    },
    graphs: {
      temperature: "Temperature",
      pressure: "Pressure",
      humidity: "Humidity",
      noise: "Noise",
      interval: {
        day: "last day",
        week: "last week",
        month: "last month",
      },
      showing: "Showing collected data for the ",
      table: {
        initialDate: "Initial Date",
        finalDate: "Final Date",
        next: "Next",
        previous: "Previous",
        empty: "No Results",
        export: "Export as CSV",
        timestamp: "Timestamp"
      }
    },
    quickConfig: {
        title: "Preview Configuration",
        description: "Select hives and sensors you want to monitor and see in realtime how they behave.",
        hives: "Hives",
        sensors: "Sensors",
        unavailable: "No available options"
    },
    monitoring: {
      title: "Video Upload",
      description: "Select a video and upload it to automatically process how many bees were detected in frame during the run time of the video.",
      notes: "Note: This might take a while to process but you can see the results and the processing status in the Results tab.",
      settings: "Settings",
      video: {
        title: "Video",
        message: "Select a file",
        empty: "No file selected"
      },
      algorithm: {
        title: "Detector Algorithm",
      },
      upload: "Upload Video",
      badge: {
        empty: "No video",
        original: "Original Video"
      }
    },
    results: {
      table: {
        filename: "Filename",
        job: "Job ID",
        resolution: "Video Resolution",
        duration: "Video Duration",
        algorithm: "Detector Algorithm",
        created: "Created At",
        status: "Status",
        processing: "Processing Time",
        next: "Next",
        previous: "Previous"
      },
      title: "Job Summary",
      graph: {
        line: "Bees x Time",
        radial: "Net Bees on interval",
        description: "Histogram showing incoming and departing in grouped by 15min intervals",
        incoming: "Incoming",
        departing: "Departing",
      },
      bees: "Bees"
    }
  },
};
