import { useEffect, useState } from "react";

type GetPressureOptions = {
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

const useGetPressure = (hiveId: string, sensorId: string, options: GetPressureOptions) => {
  const [pressure, setPressure] = useState([]);

  useEffect(() => {
    const url = new URL("http://localhost:3003/metrics/pressure");
    const getPressure = async () => {
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

        setPressure(result);
      } catch (error) {
        console.log("Failed to fetch pressure data: ", error);
      }
    };

    getPressure();
    const interval = setInterval(getPressure, 60 * 1000);

    return () => clearInterval(interval);
  }, [hiveId, options, sensorId]);

  return pressure;
};

export default useGetPressure;
