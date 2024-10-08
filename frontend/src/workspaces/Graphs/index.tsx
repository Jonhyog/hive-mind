import { useCallback, useContext, useEffect, useMemo } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import LineChart from "@/components/custom/LineChart";
import CustomRadialChart from "@/components/custom/RadialChart";

import { Button } from "@/components/ui/button";
import useGetRealtime from "@/hooks/useGetRealtime";
import useSetRealtime from "@/hooks/useSetRealtime";
import useGetTemperature from "@/hooks/useGetTemperature";
import useGetPressure from "@/hooks/useGetPressure";
import useGetHumidity from "@/hooks/useGetHumidity";
import { Separator } from "@/components/ui/separator";
import DatePicker from "@/components/custom/DatePicker";
import { Label } from "@/components/ui/label";
import { HiveContext } from "@/components/custom/HiveProvider";
import { SensorContext } from "@/components/custom/SensorProvider";
import SensorSelectionForm from "@/components/custom/SensorSelectionForm";

const radialConfig = {
  incoming: {
    label: "Incoming",
    color: "hsl(var(--chart-1))",
  },
  departing: {
    label: "Departing",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
];

const MockTable = () => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

const GraphsWorkspace = (): JSX.Element => {
  const { hive } = useContext(HiveContext);
  const { temperature, pressure, humidity } = useContext(SensorContext);

  useEffect(() => {
    console.log(temperature, pressure, humidity);
  }, [temperature, pressure, humidity]);

  const radialHookData = useGetRealtime("/data");
  const setIncoming = useSetRealtime("/data/incoming");
  const setDeparting = useSetRealtime("/data/departing");

  // TODO: update hiveId and sensorId to use from context
  const temperatureData = useGetTemperature(hive, temperature);
  const pressureData = useGetPressure(hive, pressure);
  const humidityData = useGetHumidity(hive, humidity);

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

  useEffect(() => {
    console.log("Processed temperature data: ", processedTemperature);
  }, [processedTemperature]);

  useEffect(() => {
    console.log("Processed pressure data: ", processedPressure);
  }, [processedPressure]);

  useEffect(() => {
    console.log("Processed humidity data: ", processedHumidity);
  }, [processedHumidity]);

  const handleIncomingUpdate = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * 1000);
    setIncoming(randomNumber);
  }, [setIncoming]);

  const handleDepartingUpdate = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * 1000);
    setDeparting(randomNumber);
  }, [setDeparting]);

  return (
    <div className="flex flex-row gap-4">
      {/* Place Control Form and Preview table in diferent forms */}
      <div className="flex flex-col gap-4 w-1/3">
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>Preview Selection</CardTitle>
            <CardDescription>
              Interact with the forms to update data preview selection and click
              export to generate a detailed export of the hive data.
            </CardDescription>
            {/* <Button onClick={handleDepartingUpdate}>Generate Departing</Button> */}
          </CardHeader>
        </Card>
        <SensorSelectionForm />
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-row flex-1 gap-4">
          <LineChart
            chartData={processedTemperature}
            chartConfig={temperatureConfig}
            className="w-2/3"
          />
          <CustomRadialChart
            chartData={radialHookData}
            chartConfig={radialConfig}
            className="w-1/3"
          />
        </div>
        <div className="flex flex-row flex-1 gap-4">
          <LineChart
            chartData={processedPressure}
            chartConfig={pressureConfig}
            className="flex-1 w-1/2"
          />
          <LineChart
            chartData={processedHumidity}
            chartConfig={humidityConfig}
            className="flex-1 w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default GraphsWorkspace;
