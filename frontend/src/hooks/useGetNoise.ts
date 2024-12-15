import { useEffect, useState } from "react";
import { GetMetricResponse } from "./useGetTemperature";
import baseRoute from "@/utils/api";

type GetNoiseOptions = {
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

const useGetNoise = (hiveId: string | undefined, sensorId: string | undefined, options: GetNoiseOptions): GetMetricResponse[] => {
  const [noise, setNoise] = useState([]);

  useEffect(() => {
    if (hiveId == null || sensorId == null) {
      console.log("Unnable to fetch temperature. Some data is undefined");
      return;
    }

    const url = new URL(`${baseRoute}/metrics/noise`);
    const getNoise = async () => {
      try {
        const filteredOptions = Object.entries(options).filter(
          ([, value]) => value != null
        );

        filteredOptions.forEach(([key, value]) =>
          url.searchParams.append(key, value.toString())
        );
        
        url.searchParams.append("hiveId", hiveId);
        url.searchParams.append("sensorId", sensorId);
        
        const response = await fetch(url);
        const result = await response.json();

        setNoise(result);
      } catch (error) {
        console.log("Failed to fetch pressure data: ", error);
      }
    };

    getNoise();
    const interval = setInterval(getNoise, 60 * 1000);

    return () => clearInterval(interval);
  }, [hiveId, options, sensorId]);

  return noise;
};

export default useGetNoise;
