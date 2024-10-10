import { useEffect, useState } from "react";

type GetTemperatureOptions = {
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

const useGetTemperature = (
  hiveId: string,
  sensorId: string,
  options: GetTemperatureOptions
) => {
  const [temperature, setTemperature] = useState([]);

  useEffect(() => {
    const url = new URL("http://localhost:3003/metrics/temperature");
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
