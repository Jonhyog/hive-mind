import { useEffect, useState } from "react";

const useGetPressure = (hiveId: string, sensorId: string) => {
  const [pressure, setPressure] = useState([]);

  useEffect(() => {
    const url = `http://localhost:3003/metrics/pressure?hiveId=${hiveId}&sensorId=${sensorId}`;
    const getPressure = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();

        setPressure(result);
      } catch (error) {
        console.log("Failed to fetch pressure data: ", error);
      }
    };

    getPressure();
    const interval = setInterval(getPressure, 60 * 1000);

    return () => clearInterval(interval);
  }, [hiveId, sensorId]);

  return pressure;
};

export default useGetPressure;
