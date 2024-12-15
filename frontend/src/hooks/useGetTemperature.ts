import baseRoute from "@/utils/api";
import { useEffect, useState } from "react";

type GetTemperatureOptions = {
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

export type GetMetricResponse = {
  _id: string,
  __v: number,
  value: number,
  timestamp: string,
  sensorId: string,
  metricType: string,
  hiveId: string,
};

const useGetTemperature = (
  hiveId: string | undefined,
  sensorId: string | undefined,
  options: GetTemperatureOptions
): GetMetricResponse[] => {
  const [temperature, setTemperature] = useState([]);

  useEffect(() => {
    if (hiveId == null || sensorId == null) {
      console.log("Unnable to fetch temperature. Some data is undefined");
      return;
    }

    const url = new URL(`${baseRoute}/metrics/temperature`);
    const getTemperature = async () => {
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

        setTemperature(result);
      } catch (error) {
        console.log("Failed to fetch temperature data: ", error);
      }
    };

    getTemperature();
    const interval = setInterval(getTemperature, 60 * 1000);

    return () => clearInterval(interval);
  }, [hiveId, options, sensorId]);

  return temperature;
};

export default useGetTemperature;
