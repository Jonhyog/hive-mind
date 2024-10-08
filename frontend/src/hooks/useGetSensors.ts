import { useEffect, useState } from "react";

type AllowedMetrics = "pressure" | "temperature" | "umidity" | "noise";

type GetSensorsVariables = {
  hiveId?: string;
  metricsType?: AllowedMetrics;
};

type GetSensorsResponse = {
  sensorId: string;
  description: string;
  metricsType: AllowedMetrics[];
};

const useGetSensors = (vars: GetSensorsVariables): GetSensorsResponse[] => {
  const [sensors, setSensors] = useState<GetSensorsResponse[]>([]);

  useEffect(() => {
    const url = new URL("http://localhost:3003/sensor");
    const getSensors = async () => {
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

        setSensors(result);
      } catch (error) {
        console.log("Failed to fetch hive data: ", error);
      }
    };

    getSensors();
  }, [vars]);

  return sensors;
};

export type { GetSensorsVariables, GetSensorsResponse };
export default useGetSensors;
