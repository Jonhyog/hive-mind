import { useEffect, useState } from "react";

type GetHumidityOptions = {
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

const useGetHumidity = (hiveId: string, sensorId: string, options: GetHumidityOptions) => {
  const [humidity, setHumidity] = useState([]);

  useEffect(() => {
    const url = new URL("http://localhost:3003/metrics/umidity");
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
