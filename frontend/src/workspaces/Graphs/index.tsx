import { useContext, useEffect, useMemo } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";

import { HiveContext } from "@/components/custom/HiveProvider";
import { SensorContext } from "@/components/custom/SensorProvider";
import SensorSelectionForm from "@/components/custom/SensorSelectionForm";
import LineChart from "@/components/custom/LineChart";

import useGetTemperature from "@/hooks/useGetTemperature";
import useGetPressure from "@/hooks/useGetPressure";
import useGetHumidity from "@/hooks/useGetHumidity";
import useGetNoise from "@/hooks/useGetNoise";

const temperatureConfig = {
  visitors: {
    label: "Visitors",
  },
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const pressureConfig = {
  visitors: {
    label: "Visitors",
  },
  pressure: {
    label: "Pressure",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const humidityConfig = {
  visitors: {
    label: "Visitors",
  },
  humidity: {
    label: "Humidity",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const noiseConfig = {
  visitors: {
    label: "Visitors",
  },
  noise: {
    label: "Noise",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const getDataOptions = {};

const GraphsWorkspace = (): JSX.Element => {
  const { hive } = useContext(HiveContext);
  const { temperature, pressure, humidity, noise } = useContext(SensorContext);

  useEffect(() => {
    console.log(temperature, pressure, humidity);
  }, [temperature, pressure, humidity]);

  const temperatureData = useGetTemperature(hive, temperature, getDataOptions);
  const pressureData = useGetPressure(hive, pressure, getDataOptions);
  const humidityData = useGetHumidity(hive, humidity, getDataOptions);
  const noiseData = useGetNoise(hive, noise, getDataOptions);

  const processedTemperature = useMemo(() => {
    return temperatureData.map(({ timestamp, value }) => {
      return { date: timestamp, temperature: value };
    });
  }, [temperatureData]);

  const processedPressure = useMemo(() => {
    return pressureData.map(({ timestamp, value }) => {
      return { date: timestamp, pressure: value };
    });
  }, [pressureData]);

  const processedHumidity = useMemo(() => {
    return humidityData.map(({ timestamp, value }) => {
      return { date: timestamp, humidity: value };
    });
  }, [humidityData]);

  const processedNoise = useMemo(() => {
    return noiseData.map(({ timestamp, value }) => {
      return { date: timestamp, noise: value }
    });
  }, [noiseData])

  useEffect(() => {
    console.log("Processed temperature data: ", processedTemperature);
  }, [processedTemperature]);

  useEffect(() => {
    console.log("Processed pressure data: ", processedPressure);
  }, [processedPressure]);

  useEffect(() => {
    console.log("Processed humidity data: ", processedHumidity);
  }, [processedHumidity]);

  useEffect(() => {
    console.log("Processed noise data: ", processedNoise);
  }, [processedNoise]);

  return (
    <div className="flex flex-col h-screen w-screen md:w-full md:flex-row gap-4 md:pr-0">
      {/* Place Control Form and Preview table in diferent forms */}
      <div className="flex flex-col gap-4 w-full md:w-1/3 pr-[90px] md:pr-0">
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>Preview Selection</CardTitle>
            <CardDescription>
              Interact with the forms to update data preview selection and click
              export to generate a detailed export of the hive data.
            </CardDescription>
          </CardHeader>
        </Card>
        <SensorSelectionForm />
      </div>
      <div className="flex flex-col flex-1 h-full gap-4 pr-[90px] md:pr-0">
        <div className="flex flex-col md:flex-row flex-1 gap-4">
          <LineChart
            chartData={processedTemperature}
            chartConfig={temperatureConfig}
            className="w-full md:w-1/2"
          />
          <LineChart
            chartData={processedNoise}
            chartConfig={noiseConfig}
            className="w-full md:w-1/2"
          />
          {/* <CustomRadialChart
            chartData={radialHookData}
            chartConfig={radialConfig}
            className="w-1/3"
          /> */}
        </div>
        <div className="flex flex-col md:flex-row flex-1 gap-4 md:pr-0">
          <LineChart
            chartData={processedPressure}
            chartConfig={pressureConfig}
            className="w-full md:w-1/2"
          />
          <LineChart
            chartData={processedHumidity}
            chartConfig={humidityConfig}
            className="w-full md:w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default GraphsWorkspace;
