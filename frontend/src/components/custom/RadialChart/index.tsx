import { useMemo } from "react";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import TranslatedText from "../TranslatedText";

interface RadialChartData {
  [U: string]: number;
}

type RadialMockProps = {
  chartData: RadialChartData;
  chartConfig: ChartConfig;
  className: string;
};

const CustomRadialChart = ({
  chartData,
  chartConfig,
  className,
}: RadialMockProps): JSX.Element => {
  const incoming = chartData["incoming"] ?? 0;
  const departing = chartData["departing"] ?? 0;
  const diff = incoming - departing;

  const plots = useMemo(() => {
    const keys = Object.keys(chartData);

    return keys.map((k) => (
      <RadialBar
        dataKey={k}
        fill={`var(--color-${k})`}
        stackId="a"
        cornerRadius={5}
        className="stroke-transparent stroke-2"
      />
    ));
  }, [chartData]);

  return (
    <Card className={className + " flex flex-col"}>
      <CardHeader className="items-center pb-0">
        <CardTitle><TranslatedText path="results.graph.radial" /></CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={[chartData]}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {diff.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          <TranslatedText path="results.bees" />
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            {plots}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CustomRadialChart;
