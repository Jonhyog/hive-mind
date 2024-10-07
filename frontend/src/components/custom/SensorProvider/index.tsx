import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HiveContext } from "../HiveProvider";
import useGetSensors from "@/hooks/useGetSensors";

type SensorInput = {
  temperature: string;
  pressure: string;
  humidity: string;
};

type SensorContextAPI = {
  temperature?: string;
  pressure?: string;
  humidity?: string;
  setSensorContext?: ({
    temperature,
    pressure,
    humidity,
  }: {
    temperature: string;
    pressure: string;
    humidity: string;
  }) => void;
};

const SensorContext = createContext<SensorContextAPI>({});

const SensorProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { hive } = useContext(HiveContext);
  const vars = useMemo(() => { return { hiveId: hive }}, [hive]);
  const sensors = useGetSensors(vars);

  const [temperature, setTemperature] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");

  const setSensorContext = useCallback(
    ({ temperature, pressure, humidity }: SensorInput): void => {
      setTemperature(temperature);
      setPressure(pressure);
      setHumidity(humidity);
    },
    []
  );

  const data = useMemo((): SensorContextAPI => {
    return {
      pressure,
      temperature,
      humidity,
      setSensorContext,
    }
  }, [humidity, pressure, setSensorContext, temperature]);

  useEffect(() => {
    if (sensors.length === 0) {
      return;
    }

    const temperatureSensors = sensors.filter(
      (element) => "temperature" in element.metricsType
    );
    const pressureSensors = sensors.filter(
      (element) => "pressure" in element.metricsType
    );
    const humiditySensors = sensors.filter(
      (element) => "humidity" in element.metricsType
    );

    if (temperatureSensors.length > 0) {
      setTemperature(temperatureSensors[0].sensorId);
    }

    if (pressureSensors.length > 0) {
      setPressure(pressureSensors[0].sensorId);
    }

    if (humiditySensors.length > 0) {
      setHumidity(humiditySensors[0].sensorId);
    }
  }, [sensors]);

  useEffect(() => {
    console.log("Sensor context changed to: ", temperature, pressure, humidity);
  }, [temperature, pressure, humidity]);

  return (
    <SensorContext.Provider value={data}>{children}</SensorContext.Provider>
  );
};

export { SensorProvider, SensorContext };
