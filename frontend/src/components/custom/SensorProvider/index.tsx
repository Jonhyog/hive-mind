import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { HiveContext } from "../HiveProvider";

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

  const data: SensorContextAPI = {
    pressure,
    temperature,
    humidity,
    setSensorContext,
  };

  useEffect(() => {
    const setFirstSensor = async () => {
      const url = `http://localhost:3003/sensor?hiveId=${hive}`;
      try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.length === 0) {
          return;
        }
        console.log(result);

        const temperatureSensors = result.filter(
          (element) => "temperature" in element.metricType
        );
        const pressureSensors = result.filter(
          (element) => "pressure" in element.metricType
        );
        const humiditySensors = result.filter(
          (element) => "humidity" in element.metricType
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
      } catch (error) {
        console.log(
          "Failed to fetch sensor while setting initial context: ",
          error
        );
      }
    };

    setFirstSensor();
  }, [hive]);

  useEffect(() => {
    console.log("Sensor context changed to: ", temperature, pressure, humidity);
  }, [temperature, pressure, humidity]);

  return (
    <SensorContext.Provider value={data}>{children}</SensorContext.Provider>
  );
};

export { SensorProvider, SensorContext };
