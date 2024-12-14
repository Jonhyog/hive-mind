import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

const chartData = [
    {date: 15, incoming: 3, departing: -10},
    {date: 30, incoming: 2, departing: -15},
    {date: 60, incoming: 5, departing: -12},
    {date: 75, incoming: 7, departing: -8},
    {date: 80, incoming: 10, departing: -3},
    {date: 95, incoming: 15, departing: -1},
    {date: 110, incoming: 3, departing: -10},
    {date: 125, incoming: 2, departing: -15},
    {date: 140, incoming: 5, departing: -12},
    {date: 155, incoming: 7, departing: -8},
    {date: 160, incoming: 10, departing: -3},
    {date: 175, incoming: 15, departing: -1},
    {date: 180, incoming: 3, departing: -10},
    {date: 195, incoming: 2, departing: -15},
    {date: 210, incoming: 5, departing: -12},
    {date: 225, incoming: 7, departing: -8},
    {date: 240, incoming: 10, departing: -3},
    {date: 255, incoming: 15, departing: -1},
    {date: 270, incoming: 3, departing: -10},
    {date: 285, incoming: 2, departing: -15},
    {date: 300, incoming: 5, departing: -12},
    {date: 315, incoming: 7, departing: -8},
    {date: 330, incoming: 10, departing: -3},
    {date: 345, incoming: 15, departing: -1},
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    incoming: {
        label: "Incoming",
        color: "hsl(var(--chart-1))",
    },
    departing: {
        label: "Departing",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

interface BeeData {
    [U: string]: string | number;
  }
  
interface BeeChartProps {
chartData: BeeData[];
chartConfig: ChartConfig;
className: string;
}

const BeeChart = ({ className }: BeeChartProps): JSX.Element => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle><TranslatedText path="results.graph.bar" /></CardTitle>
        <CardDescription><TranslatedText path="results.graph.description" /></CardDescription>
      </CardHeader>
      <CardContent className="w-4/5">
        <ChartContainer config={chartConfig}>
          <BarChart barGap={-30} accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              width={26}
            />
            <XAxis className="translate-y-4" tickMargin={4} minTickGap={32} dataKey="date" xAxisId={0} />
            <XAxis dataKey="date" xAxisId={1} hide/>
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="incoming" fill="var(--color-incoming)" xAxisId={0}/>
            <Bar dataKey="departing" fill="var(--color-departing)" xAxisId={1} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BeeChart;
