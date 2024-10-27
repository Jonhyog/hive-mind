import BeeLineChart from "@/components/custom/BeeLineChart";
import Combobox from "@/components/custom/Combobox";
import CustomRadialChart from "@/components/custom/RadialChart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import useGetVideos from "@/hooks/useGetVideos";
import { useEffect, useMemo, useState } from "react";

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

const videosOptions = {};

interface LineData {
  [U: string]: string | number;
}

const ResultsWorkspace = (): JSX.Element => {
  const [hash, setHash] = useState("");
  const videos = useGetVideos(videosOptions);

  const videosData = useMemo(() => {
    return videos.map((vid) => {
      return {
        value: vid._id,
        view: (
          <ProcessResult
            title={vid.filename}
            hash={vid._id}
            status={vid.status}
          />
        ),
      };
    });
  }, [videos]);

  const videosObj = useMemo(() => {
    return Object.fromEntries(
      videos.map((vid) => {
        return [vid._id, vid];
      })
    );
  }, [videos]);

  const graphsData = useMemo(() => {
    return Object.fromEntries(
      videos.map((vid) => {
        const point = { incoming: 0, departing: 0 };
        const events: LineData[] = [];

        vid.events.forEach((e) => {
          if (e.direction === "in") {
            point.incoming += 1;
          } else {
            point.departing += 1;
          }

          events.push({ date: e.timestamp.toString(), ...point });
        });

        return [vid._id, events.length !== 0 ? events : [{}]];
      })
    );
  }, [videos]);

  const radialChartHook = useMemo(() => {
    return Object.fromEntries(
      Object.entries(graphsData).map(([key, value]) => {
        const acc = value[value.length - 1];
        return [
          key,
          {
            incoming: acc?.incoming,
            departing: acc?.departing,
          },
        ];
      })
    );
  }, [graphsData]);

  useEffect(() => {
    console.log(graphsData[hash]);
    console.log(radialChartHook);
  }, [hash]);

  useEffect(() => {
    console.log(videos);
  }, [videos]);

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
          <Combobox initial={""} options={videosData} onChange={setHash} />
        </div>
        {hash !== "" && (
          <div className="w-full flex gap-2 p-4 border rounded-xl">
            <div className="flex flex-1 gap-2">
              <div className="flex flex-1 flex-col justify-between gap-4">
                <Card className="flex-1">
                  <CardHeader className="flex flex-1 w-full flex-col gap-2">
                    <CardTitle>Job Summary</CardTitle>
                    <CardDescription>
                      <ul className="list-disc list-inside text-base flex flex-col py-4 gap-2">
                      <li className="list-item">
                          <span className="font-medium mr-2">Status:</span>
                          <span>{videosObj[hash].status}</span>
                        </li>
                        <li className="list-item">
                          <span className="font-medium mr-2">Video ID:</span>
                          <span>{videosObj[hash]._id}</span>
                        </li>
                        <li className="list-item">
                          <span className="font-medium mr-2">Created At:</span>
                          <span>{videosObj[hash].createdAt}</span>
                        </li>
                        <li className="list-item">
                          <span className="font-medium mr-2">Duration:</span>
                          <span>{videosObj[hash].duration}</span>
                        </li>
                        <li className="list-item">
                          <span className="font-medium mr-2">
                            Processing Time:
                          </span>
                          <span>{videosObj[hash].processing_time}</span>
                        </li>
                        <li className="list-item">
                          <span className="font-medium mr-2">Detector:</span>
                          <span>{videosObj[hash].detector_type}</span>
                        </li>
                      </ul>
                    </CardDescription>
                  </CardHeader>
                </Card>
                <BeeLineChart
                  chartData={graphsData[hash]}
                  chartConfig={lineChartConfig}
                  className="flex-1"
                />
              </div>
            </div>
            <CustomRadialChart
              chartData={radialChartHook[hash]}
              chartConfig={radialConfig}
              className="w-1/2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsWorkspace;
