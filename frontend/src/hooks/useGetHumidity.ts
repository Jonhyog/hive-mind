import { useEffect, useState } from "react";

const useGetHumidity = (hiveId: string, sensorId: string) => {
  const [humidity, setHumidity] = useState([]);

  useEffect(() => {
    const url = `http://localhost:3003/metrics/umidity?hiveId=${hiveId}&sensorId=${sensorId}`;
    const getHumidity = async () => {
      try {
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
  }, [hiveId, sensorId]);

  return humidity;
};

export default useGetHumidity;
