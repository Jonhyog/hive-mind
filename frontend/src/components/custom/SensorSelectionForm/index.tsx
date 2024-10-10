import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useCallback, useContext, useMemo, useState } from "react";
import { HiveContext } from "@/components/custom/HiveProvider";

import useGetTemperature from "@/hooks/useGetTemperature";
import useGetPressure from "@/hooks/useGetPressure";
import useGetHumidity from "@/hooks/useGetHumidity";
import { SensorContext } from "../SensorProvider";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DatePicker from "../DatePicker";

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

const SensorSelectionForm = (): JSX.Element => {
  const { hive } = useContext(HiveContext);
  const { temperature, pressure, humidity } = useContext(SensorContext);

  const [queryOptions, setQueryOptions] = useState({});

  const temperatureData = useGetTemperature(hive, temperature, queryOptions);
  const pressureData = useGetPressure(hive, pressure, queryOptions);
  const humidityData = useGetHumidity(hive, humidity, queryOptions);

  const maxSize = useMemo(
    () =>
      Math.min(
        temperatureData.length,
        pressureData.length,
        humidityData.length
      ),
    [humidityData.length, pressureData.length, temperatureData.length]
  );

  const temperatureSlice = useMemo(
    () => temperatureData.slice(0, maxSize),
    [maxSize, temperatureData]
  );
  const pressureSlice = useMemo(
    () => pressureData.slice(0, maxSize),
    [maxSize, pressureData]
  );
  const humiditySlice = useMemo(
    () => humidityData.slice(0, maxSize),
    [maxSize, humidityData]
  );

  const tableData = useMemo(
    () =>
      [...Array(maxSize).keys()].map((idx) => {
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
      }),
    [humiditySlice, maxSize, pressureSlice, temperatureSlice]
  );

  const onChangeStartDate = useCallback((value: Date | undefined) => {
    setQueryOptions((prev) => {
      return {
        ...prev,
        startDate: value
      };
    })
  }, []);

  const onChangeEndDate = useCallback((value: Date | undefined) => {
    setQueryOptions((prev) => {
      // sets endDate to endDate + 1 to make selection inclusive
      if (value) {
        value.setDate(value.getDate() + 1);
      }

      return {
        ...prev,
        endDate: value
      };
    })
  }, []);

  return (
    <div className="flex flex-col flex-1 border rounded-lg p-4">
      <DataTable columns={columns} data={tableData} />
      {/* <SensorDataTable /> */}
      <Separator className="my-4" />
      <form className="flex flex-col flex-1 w-full items-start gap-4">
        <fieldset className="flex flex-col flex-1 w-full justify-between gap-2 p-1">
          <div className="flex flex-row flex-1 justify-between gap-2">
            <div className="flex flex-col justify-start gap-2 flex-1">
              <Label htmlFor="start-time">Initial Date</Label>
              <DatePicker onChange={onChangeStartDate}/>
            </div>
            <div className="flex flex-col justify-start gap-2 flex-1">
              <Label htmlFor="start-time">Final Date</Label>
              <DatePicker onChange={onChangeEndDate}/>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-stretch gap-4">
            <Button>Export as CSV</Button>
          </div>
          {/* <Button onClick={handleDepartingUpdate}>Generate Departing</Button> */}
        </fieldset>
      </form>
    </div>
  );
};

export default SensorSelectionForm;
