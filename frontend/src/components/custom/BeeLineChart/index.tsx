import { useMemo } from "react";

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
import TranslatedText from "../TranslatedText";

interface LineData {
  [U: string]: string | number;
}

interface LineMockProps {
  chartData: LineData[];
  chartConfig: ChartConfig;
  className: string;
}

const BeeLineChart = ({
  chartData = [{}],
  chartConfig,
  className,
}: LineMockProps): JSX.Element => {
  console.log(chartData);
  const plots = useMemo(() => {
    const keys = Object.keys(chartData[0]);

    return keys.filter((k) => typeof chartData[0][k] !== "string").map((k) => (
      <Area
        dataKey={k}
        type="linear"
        fill={`url(#fill${chartConfig[k]?.label ?? ""})`}
        stroke={`var(--color-${k})`}
        stackId={k}
        isAnimationActive={false}
      />
    ));
  }, [chartData, chartConfig]);

  const plotsGradients = useMemo(() => {
    const keys = Object.keys(chartData[0]);

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
  }, [chartData, chartConfig]);

  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle><TranslatedText path="results.graph.line" /></CardTitle>
          <CardDescription>
          <TranslatedText path="results.graph.description" />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>{plotsGradients}</defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return parseFloat(value).toFixed(2);
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
                    return parseFloat(value).toFixed(2);
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

export default BeeLineChart;
