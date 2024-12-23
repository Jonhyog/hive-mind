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
import DownloadCSV from "../DownloadCSV";
import useGetNoise from "@/hooks/useGetNoise";
import TranslatedText from "../TranslatedText";

export type SensorData = {
  temperatureTimestamp: string | undefined;
  temperature: number;
  pressureTimestamp: string | undefined;
  pressure: number;
  humidityTimestamp: string | undefined;
  humidity: number;
  noiseTimestamp: string | undefined;
  noise: number;
};

const header = [
  "temperatureTimestamp",
  "temperature",
  "pressureTimestamp",
  "pressure",
  "humidityTimestamp",
  "humidity",
  "noiseTimestamp",
  "noise",
];

const columns: ColumnDef<SensorData>[] = [
  {
    accessorKey: "temperatureTimestamp",
    header: () => (
      <div className="text-center">
        <TranslatedText path="graphs.temperature" />{" "}
        <TranslatedText path="graphs.table.timestamp" />
      </div>
    ),
    cell: ({ row }) => {
      const value: string | undefined = row.getValue("temperatureTimestamp");
      const date = value != null ? new Date(value) : value;
      const text =
        value != null
          ? `${date?.toLocaleDateString()} - ${date?.toLocaleTimeString()}`
          : null;

      return <div className="text-left font-semibold">{text}</div>;
    },
  },
  {
    accessorKey: "temperature",
    header: () => (
      <div className="text-center">
        <TranslatedText path="graphs.temperature" />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("temperature")}</div>;
    },
  },
  {
    accessorKey: "pressureTimestamp",
    header: () => (
      <div className="text-center">
        <TranslatedText path="graphs.pressure" />{" "}
        <TranslatedText path="graphs.table.timestamp" />
      </div>
    ),
    cell: ({ row }) => {
      const value: string | undefined = row.getValue("pressureTimestamp");
      const date = value != null ? new Date(value) : value;
      const text =
        value != null
          ? `${date?.toLocaleDateString()} - ${date?.toLocaleTimeString()}`
          : null;

      return <div className="text-left font-semibold">{text}</div>;
    },
  },
  {
    accessorKey: "pressure",
    header: () => (
      <div className="text-center">
        <TranslatedText path="graphs.pressure" />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("pressure")}</div>;
    },
  },
  {
    accessorKey: "humidityTimestamp",
    header: () => (
      <div className="text-center">
        <TranslatedText path="graphs.humidity" />{" "}
        <TranslatedText path="graphs.table.timestamp" />
      </div>
    ),
    cell: ({ row }) => {
      const value: string | undefined = row.getValue("humidityTimestamp");
      const date = value != null ? new Date(value) : value;
      const text =
        value != null
          ? `${date?.toLocaleDateString()} - ${date?.toLocaleTimeString()}`
          : null;

      return <div className="text-left font-semibold">{text}</div>;
    },
  },
  {
    accessorKey: "humidity",
    header: () => (
      <div className="text-center">
        <TranslatedText path="graphs.humidity" />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("humidity")}</div>;
    },
  },
  {
    accessorKey: "noiseTimestamp",
    header: () => (
      <div className="text-center">
        <TranslatedText path="graphs.noise" />{" "}
        <TranslatedText path="graphs.table.timestamp" />
      </div>
    ),
    cell: ({ row }) => {
      const value: string | undefined = row.getValue("noiseTimestamp");
      const date = value != null ? new Date(value) : value;
      const text =
        value != null
          ? `${date?.toLocaleDateString()} - ${date?.toLocaleTimeString()}`
          : null;

      return <div className="text-left font-semibold">{text}</div>;
    },
  },
  {
    accessorKey: "noise",
    header: () => (
      <div className="text-center">
        <TranslatedText path="graphs.noise" />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("noise")}</div>;
    },
  },
];

// TODO: Update component name
const MetricPreviewAndExport = (): JSX.Element => {
  const { hive } = useContext(HiveContext);
  const { temperature, pressure, humidity, noise } = useContext(SensorContext);

  const [queryOptions, setQueryOptions] = useState({});

  const temperatureData = useGetTemperature(hive, temperature, queryOptions);
  const pressureData = useGetPressure(hive, pressure, queryOptions);
  const humidityData = useGetHumidity(hive, humidity, queryOptions);
  const noiseData = useGetNoise(hive, noise, queryOptions);

  const maxSize = useMemo(
    () =>
      Math.max(
        temperatureData.length,
        pressureData.length,
        humidityData.length,
        noiseData.length
      ),
    [
      noiseData.length,
      humidityData.length,
      pressureData.length,
      temperatureData.length,
    ]
  );

  const tableData = useMemo(
    () =>
      [...Array(maxSize).keys()].map((idx) => {
        return {
          temperatureTimestamp: temperatureData[idx]?.timestamp,
          temperature: temperatureData[idx]?.value,
          pressureTimestamp: pressureData[idx]?.timestamp,
          pressure: pressureData[idx]?.value,
          humidityTimestamp: humidityData[idx]?.timestamp,
          humidity: humidityData[idx]?.value,
          noiseTimestamp: noiseData[idx]?.timestamp,
          noise: noiseData[idx]?.value,
        };
      }),
    [maxSize, temperatureData, pressureData, humidityData, noiseData]
  );

  const onChangeStartDate = useCallback((value: Date | undefined) => {
    setQueryOptions((prev) => {
      return {
        ...prev,
        startDate: value,
      };
    });
  }, []);

  const onChangeEndDate = useCallback((value: Date | undefined) => {
    setQueryOptions((prev) => {
      // sets endDate to endDate + 1 to make selection inclusive
      if (value) {
        value.setDate(value.getDate() + 1);
      }

      return {
        ...prev,
        endDate: value,
      };
    });
  }, []);

  console.log();

  return (
    <div className="flex flex-col flex-1 border rounded-lg p-4">
      <DataTable columns={columns} data={tableData} pageSize={7} />
      <Separator className="my-4" />
      <form className="flex flex-col flex-1 w-full items-start gap-4">
        <fieldset className="flex flex-col flex-1 w-full justify-between gap-2 p-1">
          <div className="flex flex-row flex-1 justify-between gap-2">
            <div className="flex flex-col justify-start gap-2 flex-1">
              <Label htmlFor="start-time">
                <TranslatedText path="graphs.table.initialDate" />
              </Label>
              <DatePicker onChange={onChangeStartDate} />
            </div>
            <div className="flex flex-col justify-start gap-2 flex-1">
              <Label htmlFor="start-time">
                <TranslatedText path="graphs.table.finalDate" />
              </Label>
              <DatePicker onChange={onChangeEndDate} />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-stretch">
            <DownloadCSV fileName="report" header={header} data={tableData} />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default MetricPreviewAndExport;
