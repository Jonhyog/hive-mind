import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { HiveContext } from "../HiveProvider";
import useGetSensors from "@/hooks/useGetSensors";

type SensorContextAPI = {
  temperature?: string;
  pressure?: string;
  humidity?: string;
  noise?: string;
  setSensorContext?: {
    setTemperature?: (temperatureSensor: string) => void;
    setPressure?: (pressureSensor: string) => void;
    setHumidity?: (humiditySensor: string) => void;
    setNoise?: (noiseSensor: string) => void;
  };
};

const SensorContext = createContext<SensorContextAPI>({});

const SensorProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { hive } = useContext(HiveContext);
  const vars = useMemo(() => {
    return { hiveId: hive };
  }, [hive]);
  const sensors = useGetSensors(vars);

  const [temperature, setTemperature] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  const [noise, setNoise] = useState("");

  const data = useMemo((): SensorContextAPI => {
    return {
      pressure,
      temperature,
      humidity,
      noise,
      setSensorContext: { setTemperature, setPressure, setHumidity, setNoise },
    };
  }, [humidity, noise, pressure, temperature]);

  useEffect(() => {
    const temperatureSensors = sensors.filter((element) =>
      element.metricsType.includes("temperature")
    );
    const pressureSensors = sensors.filter((element) =>
      element.metricsType.includes("pressure")
    );
    const humiditySensors = sensors.filter((element) =>
      element.metricsType.includes("umidity")
    );
    const noiseSensors = sensors.filter((element) =>
      element.metricsType.includes("noise")
    );

    if (temperatureSensors.length > 0) {
      setTemperature(temperatureSensors[0].sensorId);
    } else {
      setTemperature("");
    }

    if (pressureSensors.length > 0) {
      setPressure(pressureSensors[0].sensorId);
    } else {
      setPressure("");
    }

    if (humiditySensors.length > 0) {
      setHumidity(humiditySensors[0].sensorId);
    } else {
      setHumidity("");
    }

    if (noiseSensors.length > 0) {
      setNoise(noiseSensors[0].sensorId);
    } else {
      setNoise("");
    }
  }, [hive, sensors]);

  useEffect(() => {
    console.log(
      "Sensor context changed to: ",
      temperature,
      pressure,
      humidity,
      noise
    );
  }, [temperature, pressure, humidity, noise]);

  return (
    <SensorContext.Provider value={data}>{children}</SensorContext.Provider>
  );
};

export { SensorProvider, SensorContext };
