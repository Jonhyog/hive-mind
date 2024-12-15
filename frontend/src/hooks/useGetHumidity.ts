import { useEffect, useState } from "react";
import { GetMetricResponse } from "./useGetTemperature";
import baseRoute from "@/utils/api";

type GetHumidityOptions = {
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

const useGetHumidity = (hiveId: string | undefined, sensorId: string | undefined, options: GetHumidityOptions): GetMetricResponse[] => {
  const [humidity, setHumidity] = useState([]);

  useEffect(() => {
    if (hiveId == null || sensorId == null) {
      console.log("Unnable to fetch humidity. Some data is undefined");
      return;
    }

    const url = new URL(`${baseRoute}/metrics/umidity`);
    const getHumidity = async () => {
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

        setHumidity(result);
      } catch (error) {
        console.log("Failed to fetch pressure data: ", error);
      }
    };

    getHumidity();
    const interval = setInterval(getHumidity, 60 * 1000);

    return () => clearInterval(interval);
  }, [hiveId, options, sensorId]);

  return humidity;
};

export default useGetHumidity;
