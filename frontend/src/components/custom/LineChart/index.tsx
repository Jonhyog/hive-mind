import { useCallback, useMemo, useState } from "react";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import fillTime from "@/utils/fillTime";

interface LineData {
  [U: string]: string | number;
}

interface LineMockProps {
  chartData: LineData[];
  chartConfig: ChartConfig;
  className: string;
}

type TimeInterval = "1d" | "7d" | "30d";

const LineChart = ({
  chartData = [{}],
  chartConfig,
  className,
}: LineMockProps): JSX.Element => {
  const [timeRange, setTimeRange] = useState<TimeInterval>("1d");

  const getIntervalLabel = useCallback((interval: TimeInterval) => {
    const intervalLabels = {
      "1d": "last day",
      "7d": "last week",
      "30d": "last month"
    };

    return intervalLabels[interval];
  }, []);

  const filteredData = useMemo(() => {
    const filtered = chartData.filter((item) => {
      const date = new Date(item.date);
      const now = new Date();
      let daysToSubtract = 1;
      if (timeRange === "7d") {
        daysToSubtract = 7;
      } else if (timeRange === "30d") {
        daysToSubtract = 30;
      }
      now.setDate(now.getDate() - daysToSubtract);

      return date >= now;
    });

    const filledData = fillTime(filtered, 5 * 60 * 1000);

    return filledData.length > 0 ? filledData : [{}];
  }, [chartData, timeRange]);

  const plots = useMemo(() => {
    const keys = Object.keys(filteredData[0]);

    return keys.filter((k) => typeof filteredData[0][k] !== "string").map((k) => (
      <Area
        dataKey={k}
        type="linear"
        fill={`url(#fill${chartConfig[k]?.label ?? ""})`}
        stroke={`var(--color-${k})`}
        stackId="a"
        isAnimationActive={false}
      />
    ));
  }, [filteredData, chartConfig]);

  const plotsGradients = useMemo(() => {
    const keys = Object.keys(filteredData[0]);

    return keys.map((k) => (
      <linearGradient
        id={`fill${chartConfig[k]?.label ?? ""}`}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop offset="5%" stopColor={`var(--color-${k})`} stopOpacity={0.8} />
        <stop offset="95%" stopColor={`var(--color-${k})`} stopOpacity={0.1} />
      </linearGradient>
    ));
  }, [filteredData, chartConfig]);

  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing collected data for the {getIntervalLabel(timeRange)}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1d" className="rounded-lg">
              Last day
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last week
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last month
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>{plotsGradients}</defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString();
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
              width={26}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleString();
                  }}
                  indicator="dot"
                />
              }
            />
            {plots}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineChart;
