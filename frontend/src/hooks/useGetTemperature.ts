import { useEffect, useState } from "react";

const useGetTemperature = (hiveId: string, sensorId: string) => {
  const [temperature, setTemperature] = useState([]);

  useEffect(() => {
    const url = `http://localhost:3003/metrics/temperature?hiveId=${hiveId}&sensorId=${sensorId}`;
    const getTemperature = async () => {
      try {
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
  }, [hiveId, sensorId]);

  return temperature;
};

export default useGetTemperature;
