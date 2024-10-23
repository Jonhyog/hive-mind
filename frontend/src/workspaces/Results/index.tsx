import Combobox from "@/components/custom/Combobox";
import LineChart from "@/components/custom/LineChart";
import CustomRadialChart from "@/components/custom/RadialChart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { useEffect, useState } from "react";

type ProcessResultProps = {
  title: string;
  hash: string;
  status: string;
};

const ProcessResult = ({
  title,
  hash,
  status,
}: ProcessResultProps): JSX.Element => {
  return (
    <div className="w-full flex justify-between">
      <span>
        {title}: {hash}
      </span>
      <span className="text-muted-foreground font-medium">{status}</span>
    </div>
  );
};

const ModelResults = [
  {
    value: "Lorem: 1337",
    view: <ProcessResult title="Lorem" hash="1337" status="completed" />,
  },
  {
    value: "Ipsum: 0420",
    view: <ProcessResult title="Ipsum" hash="0420" status="processing" />,
  },
  {
    value: "Dolor: 1234",
    view: <ProcessResult title="Dolor" hash="1234" status="completed" />,
  },
];

const radialConfig = {
  incoming: {
    label: "Incoming",
    color: "hsl(var(--chart-1))",
  },
  departing: {
    label: "Departing",
    color: "hsl(var(--chart-2))",
  },
};

const lineChartConfig = {
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

const radialChartData = {
  "Lorem: 1337": {
    incoming: 750,
    departing: 800,
  },
  "Ipsum: 0420": {
    incoming: 900,
    departing: 800,
  },
  "Dolor: 1234": {
    incoming: 700,
    departing: 850,
  },
};

const lineChartData = {
  "Lorem: 1337": [
    { date: '2024-10-03T21:21:19.742Z', incoming: 222, departing: 150 },
    { date: '2024-10-03T21:21:24.746Z', incoming: 97, departing: 180 },
    { date: '2024-10-03T21:21:33.140Z', incoming: 167, departing: 120 },
    { date: '2024-10-03T21:21:37.874Z', incoming: 242, departing: 260 },
    { date: '2024-10-03T21:21:42.553Z', incoming: 373, departing: 290 },
    { date: '2024-10-03T21:21:53.863Z', incoming: 301, departing: 340 },
  ],
  "Ipsum: 0420": [
    { date: '2024-10-03T21:21:19.742Z', incoming: 327, departing: 350 },
    { date: '2024-10-03T21:21:24.746Z', incoming: 292, departing: 210 },
    { date: '2024-10-03T21:21:33.140Z', incoming: 342, departing: 380 },
    { date: '2024-10-03T21:21:42.553Z', incoming: 137, departing: 220 },
    { date: '2024-10-03T21:21:42.553Z', incoming: 120, departing: 170 },
    { date: '2024-10-03T21:21:42.553Z', incoming: 138, departing: 190 },
    { date: '2024-10-03T21:21:59.345Z', incoming: 446, departing: 360 },
    { date: '2024-10-03T21:22:05.187Z', incoming: 364, departing: 410 },
  ],
  "Dolor: 1234": [
    { date: '2024-10-03T21:21:19.742Z', incoming: 498, departing: 520 },
    { date: '2024-10-03T21:21:24.746Z', incoming: 388, departing: 300 },
    { date: '2024-10-03T21:21:33.140Z', incoming: 149, departing: 210 },
    { date: '2024-10-03T21:21:42.553Z', incoming: 227, departing: 180 },
    { date: '2024-10-03T21:21:42.553Z', incoming: 293, departing: 330 },
    { date: '2024-10-03T21:21:42.553Z', incoming: 335, departing: 270 },
    { date: '2024-10-03T21:21:59.345Z', incoming: 197, departing: 240 },
    { date: '2024-10-03T21:22:05.187Z', incoming: 197, departing: 160 },
  ],
};

const ResultsWorkspace = (): JSX.Element => {
  const [hash, setHash] = useState(ModelResults[0].value);

  useEffect(() => {
    console.log(lineChartData[hash]);
  }, [hash]);

  return (
    <div className="flex flex-1 flex-col md:flex-row justify-between h-screen w-full md:w-full flex-row gap-4">
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <div className="flex flex-col gap-4 w-full md:w-[460px] md:pr-0">
          <Card>
            <CardHeader className="flex flex-col gap-2">
              <CardTitle>Work In Progress</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Deleniti, excepturi.
              </CardDescription>
            </CardHeader>
          </Card>
          <Combobox
            initial="Lorem: 1337"
            options={ModelResults}
            onChange={setHash}
          />
        </div>
        <div className="w-full flex gap-2 p-4 border rounded-xl">
          <div className="flex flex-1 gap-2">
            <div className="flex flex-1 flex-col justify-between gap-4">
              <LineChart chartData={lineChartData[hash]} chartConfig={lineChartConfig} className="flex-1" />
              <CustomRadialChart
                chartData={radialChartData[hash]}
                chartConfig={radialConfig}
                className="flex-1"
              />
            </div>
          </div>
          <Card className="w-1/2">
            <CardHeader className="flex flex-1 w-full flex-col gap-2">
              <CardTitle>Job Summary</CardTitle>
              <CardDescription>
                <span className="w-1/2">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Suscipit explicabo tenetur praesentium, veniam unde architecto
                  iusto illo non, quas deleniti culpa enim libero sed voluptas
                  ab placeat esse ipsam quo corporis laboriosam molestiae
                  pariatur. Iusto error laborum vel illo maiores odit ex atque
                  quo, quasi mollitia? Commodi molestias nulla porro, eius
                  possimus vero at, fugit, ad perferendis hic libero cum
                  distinctio est deserunt ipsa quibusdam recusandae voluptates
                  assumenda rem tempora harum labore natus nostrum adipisci. Rem
                  repellendus cupiditate, iste officia repudiandae dolor numquam
                  itaque sequi quibusdam fugiat aspernatur delectus molestiae
                  nisi officiis fuga placeat, a natus suscipit! Veniam quibusdam
                  magnam minus amet atque illo temporibus! Qui ab iusto deserunt
                  aliquam praesentium nisi illo blanditiis, modi facilis
                  voluptatem odit culpa? Assumenda, possimus. Consectetur dolore
                  in itaque, accusantium dolorum veritatis ex beatae repudiandae
                  non. Fuga exercitationem, similique voluptates temporibus amet
                  possimus eligendi, fugit voluptas ut commodi asperiores sint.
                  Omnis magni saepe veniam!
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsWorkspace;
