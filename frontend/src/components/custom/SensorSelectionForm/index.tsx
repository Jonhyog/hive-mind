import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { HiveContext } from "@/components/custom/HiveProvider";
import useGetSensors from "@/hooks/useGetSensors";

import type { GetSensorsVariables } from "@/hooks/useGetSensors";
import useGetTemperature from "@/hooks/useGetTemperature";
import useGetPressure from "@/hooks/useGetPressure";
import useGetHumidity from "@/hooks/useGetHumidity";
import { SensorContext } from "../SensorProvider";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";

export type SensorData = {
  timestamp: string;
  temperature: number;
  pressure: number;
  humidity: number;
  noise: number;
};

const columns: ColumnDef<SensorData>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"));

      return (
        <div className="text-left font-semibold">{`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`}</div>
      );
    },
  },
  {
    accessorKey: "temperature",
    header: () => <div className="text-center">Temperature</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("temperature")}</div>;
    },
  },
  {
    accessorKey: "pressure",
    header: () => <div className="text-center">Pressure</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("temperature")}</div>;
    },
  },
  {
    accessorKey: "humidity",
    header: () => <div className="text-center">Humidity</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("temperature")}</div>;
    },
  },
  {
    accessorKey: "noise",
    header: () => <div className="text-center">Noise</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("temperature")}</div>;
    },
  },
];

const SensorSelector = ({
  sensorType,
  sensorOptions,
  sensorDefault,
  onSelect,
}): JSX.Element => {
  const [sensor, setSensor] = useState(sensorOptions[0]);

  const onChange = useCallback((value) => {
    setSensor(value);
    onSelect(value);
  }, [onSelect]);

  useEffect(() => {
    setSensor(sensorOptions[0]);
  }, [sensorOptions]);

  return (
    <div className="flex flex-1 flex-col gap-1">
      <Label>{sensorType}</Label>
      <Select value={sensor} onValueChange={onChange}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select a sensor to preview" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sensorOptions.map((option) => (
              <SelectItem value={option}>{option}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const SensorSelectionForm = (): JSX.Element => {
  const { hive } = useContext(HiveContext);
  const { temperature, pressure, humidity, setSensorContext } =
    useContext(SensorContext);
  const temperatureQueryOptions = useMemo((): GetSensorsVariables => {
    return {
      hiveId: hive,
      metricsType: "temperature",
    };
  }, [hive]);
  const pressureQueryOptions = useMemo((): GetSensorsVariables => {
    return {
      hiveId: hive,
      metricsType: "pressure",
    };
  }, [hive]);
  const humidityQueryOptions = useMemo((): GetSensorsVariables => {
    return {
      hiveId: hive,
      metricsType: "umidity",
    };
  }, [hive]);

  const temperatureSensors = useGetSensors(temperatureQueryOptions);
  const temperatureOptions = useMemo(() => {
    return temperatureSensors
      .filter((element) => element.metricsType.includes("temperature"))
      .map((element) => element.sensorId);
  }, [temperatureSensors]);

  const pressureSensors = useGetSensors(pressureQueryOptions);
  const pressureOptions = useMemo(() => {
    return pressureSensors
      .filter((element) => element.metricsType.includes("pressure"))
      .map((element) => element.sensorId);
  }, [pressureSensors]);

  const humiditySensors = useGetSensors(humidityQueryOptions);
  const humidityOptions = useMemo(() => {
    return humiditySensors
      .filter((element) => element.metricsType.includes("umidity"))
      .map((element) => element.sensorId);
  }, [humiditySensors]);

  const temperatureData = useGetTemperature(hive, temperature);
  const pressureData = useGetPressure(hive, pressure);
  const humidityData = useGetHumidity(hive, humidity);

  const maxSize = Math.min(
    temperatureData.length,
    pressureData.length,
    humidityData.length
  );

  const temperatureSlice = temperatureData.slice(0, maxSize);
  const pressureSlice = pressureData.slice(0, maxSize);
  const humiditySlice = humidityData.slice(0, maxSize);

  const tableData = [...Array(maxSize).keys()].map((idx) => {
    const temp = {
      timestamp: temperatureSlice[idx].timestamp,
      temperature: temperatureSlice[idx].value,
    };
    const press = {
      timestamp: pressureSlice[idx].timestamp,
      pressure: pressureSlice[idx].value,
    };
    const humi = {
      timestamp: humiditySlice[idx].timestamp,
      humidity: humiditySlice[idx].value,
    };
    const noise = {
      timestamp: humiditySlice[idx].timestamp,
      noise: 0,
    };

    return { ...temp, ...press, ...humi, ...noise };
  });

  const onTemperatureChange = useCallback(
    (value: string) => {
        console.log(value, temperature, pressure, humidity);
        if (value && temperature && pressure && humidity && setSensorContext) {
        const prevContext = {
          temperature,
          pressure,
          humidity,
        };

        const newContext = {
          ...prevContext,
          ["temperature"]: value,
        };

        setSensorContext(newContext);
      }
    },
    [humidity, pressure, setSensorContext, temperature]
  );

  const onPressureChange = useCallback(
    (value: string) => {
      if (value && temperature && pressure && humidity && setSensorContext) {
        const prevContext = {
          temperature,
          pressure,
          humidity,
        };

        const newContext = {
          ...prevContext,
          ["pressure"]: value,
        };

        setSensorContext(newContext);
      }
    },
    [humidity, pressure, setSensorContext, temperature]
  );

  const onHumidityChange = useCallback(
    (value: string) => {
      if (value && temperature && pressure && humidity && setSensorContext) {
        const prevContext = {
          temperature,
          pressure,
          humidity,
        };

        const newContext = {
          ...prevContext,
          ["humidity"]: value,
        };

        setSensorContext(newContext);
      }
    },
    [humidity, pressure, setSensorContext, temperature]
  );

  return (
    <div className="flex flex-col flex-1 border rounded-lg p-4">
      <DataTable columns={columns} data={tableData} />
      {/* <SensorDataTable /> */}
      <Separator className="my-4" />
      <form className="flex flex-col flex-1 w-full items-start gap-4">
        <fieldset className="flex flex-col flex-1 w-full justify-between gap-2 p-1">
          {/* <div className="flex flex-row flex-1 justify-between gap-2">
            <div className="flex flex-col justify-start gap-2 flex-1">
              <Label htmlFor="start-time">Initial Date</Label>
              <DatePicker id="start-time" />
            </div>
            <div className="flex flex-col justify-start gap-2 flex-1">
              <Label htmlFor="start-time">Final Date</Label>
              <DatePicker id="start-time" />
            </div>
          </div> */}
          <div className="flex flex-1 flex-col justify-stretch gap-4">
            <SensorSelector
              sensorType="Temperature"
              sensorOptions={temperatureOptions}
              sensorDefault={temperatureOptions[0]}
              onSelect={onTemperatureChange}
            />
            <SensorSelector
              sensorType="Pressure"
              sensorOptions={pressureOptions}
              sensorDefault={pressureOptions[0]}
              onSelect={onPressureChange}
            />
            <SensorSelector
              sensorType="Humidity"
              sensorOptions={humidityOptions}
              sensorDefault={humidityOptions[0]}
              onSelect={onHumidityChange}
            />
            <Button>Export as CSV</Button>
          </div>
          {/* <Button onClick={handleDepartingUpdate}>Generate Departing</Button> */}
        </fieldset>
      </form>
    </div>
  );
};

export default SensorSelectionForm;
