import baseRoute from "@/utils/api";
import { useEffect, useState } from "react";

type GetVideoVariables = {
  videoId?: string;
};

type DetectionEvent = {
  _id: string,
  direction: string,
  timestamp: number,
};

type GetVideosResponse = {
    createdAt: string;
    detector_type: string;
    duration: number;
    events: DetectionEvent[];
    filename: string;
    processing_time: number;
    resolution: string;
    status: string;
    updatedAt: string;
    _id: string;
};

const useGetVideos = (vars: GetVideoVariables): GetVideosResponse[] => {
  const [videos, setVideos] = useState<GetVideosResponse[]>([]);

  useEffect(() => {
    const url = new URL(`${baseRoute}/video/`);
    const getVideos = async () => {
      const filteredEntries = Object.fromEntries(
        Object.entries(vars).filter(
          ([, value]) => value != null && value !== ""
        )
      );

      Object.entries(filteredEntries).forEach(([key, value]) =>
        url.searchParams.append(key, value)
      );

      try {
        const response = await fetch(url);
        const result = await response.json();

        setVideos(result);
      } catch (error) {
        console.log("Failed to videos data: ", error);
      }
    };

    getVideos();
  }, [vars]);

  return videos;
};

export type { GetVideoVariables as GetSensorsVariables, GetVideosResponse as GetSensorsResponse };
export default useGetVideos;
