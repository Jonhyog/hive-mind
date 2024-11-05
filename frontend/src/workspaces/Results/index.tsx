import BeeLineChart from "@/components/custom/BeeLineChart";
import { DataTable } from "@/components/custom/DataTable";
import CustomRadialChart from "@/components/custom/RadialChart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import useGetVideos from "@/hooks/useGetVideos";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

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

type JobData = {
  createdAt: string;
  detector_type: string;
  duration: number;
  filename: string;
  resolution: string;
  status: string;
  _id: string;
};

const columns: ColumnDef<JobData>[] = [
  {
    accessorKey: "filename",
    header: () => <div className="text-center text-strong">Filename</div>,
    cell: ({ row }) => (
      <LinkRow route={"/results/" + row.getValue("_id")}>
        {row.getValue("filename")}
      </LinkRow>
    ),
  },
  {
    accessorKey: "_id",
    header: () => <div className="text-center text-strong">Job ID</div>,
    cell: ({ row }) => (
      <LinkRow route={"/results/" + row.getValue("_id")}>
        {row.getValue("_id")}
      </LinkRow>
    ),
  },
  {
    accessorKey: "resolution",
    header: () => (
      <div className="text-center text-strong">Video Resolution</div>
    ),
    cell: ({ row }) => (
      <LinkRow route={"/results/" + row.getValue("_id")}>
        {row.getValue("resolution")}
      </LinkRow>
    ),
  },
  {
    accessorKey: "duration",
    header: () => <div className="text-center text-strong">Video Duration</div>,
    cell: ({ row }) => (
      <LinkRow route={"/results/" + row.getValue("_id")}>
        {row.getValue("duration")}
      </LinkRow>
    ),
  },
  {
    accessorKey: "detector_type",
    header: () => (
      <div className="text-center text-strong">Detector Algorithm</div>
    ),
    cell: ({ row }) => (
      <LinkRow route={"/results/" + row.getValue("_id")}>
        {row.getValue("detector_type")}
      </LinkRow>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-center text-strong">Created At</div>
    ),
    cell: ({ row }) => {
      const formatedDate = new Date(row.getValue("createdAt")).toLocaleString();

      return (
        <LinkRow route={"/results/" + row.getValue("_id")}>
          <span>{formatedDate}</span>
        </LinkRow>
      );
    }
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center text-strong">Status</div>,
    cell: ({ row }) => (
      <LinkRow route={"/results/" + row.getValue("_id")}>
        {row.getValue("status")}
      </LinkRow>
    ),
  },
];

const LinkRow = ({ route, children }: { route: string; children: JSX.Element }) => {
  return (
    <Link to={route}>
      <div className="text-center font-medium">{children}</div>
    </Link>
  );
};

const ResultsWorkspace = (): JSX.Element => {
  const videos = useGetVideos(videosOptions);
  const { id } = useParams();

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

  return (
    <div className="flex flex-1 flex-col md:flex-row justify-between h-screen w-full md:w-full flex-row gap-4">
      <div className="flex flex-col justify-center md:flex-row gap-4 flex-1">
        {id == null && <DataTable columns={columns} data={videos} pageSize={10} />}
        {id != null && (
          <div className="w-full flex flex-col md:flex-row gap-2 p-4 border rounded-xl">
            <div className="flex flex-1 gap-2">
              <div className="flex flex-1 flex-col justify-between gap-4">
                <Card className="flex-1">
                  <CardHeader className="flex flex-1 w-full flex-col gap-2">
                    <CardTitle>Job Summary</CardTitle>
                    <CardDescription>
                      <ul className="list-disc list-inside text-base flex flex-col py-4 gap-2">
                        <li className="list-item">
                          <span className="md:font-medium mr-2">Status:</span>
                          <span>{videosObj[id]?.status}</span>
                        </li>
                        <li className="list-item">
                          <span className="md:font-medium mr-2">Video ID:</span>
                          <span>{videosObj[id]?._id}</span>
                        </li>
                        <li className="list-item">
                          <span className="md:font-medium mr-2">
                            Created At:
                          </span>
                          <span>{videosObj[id]?.createdAt}</span>
                        </li>
                        <li className="list-item">
                          <span className="md:font-medium mr-2">Duration:</span>
                          <span>{videosObj[id]?.duration}</span>
                        </li>
                        <li className="list-item">
                          <span className="md:font-medium mr-2">
                            Processing Time:
                          </span>
                          <span>{videosObj[id]?.processing_time}</span>
                        </li>
                        <li className="list-item">
                          <span className="font-medium mr-2">Detector:</span>
                          <span>{videosObj[id]?.detector_type}</span>
                        </li>
                      </ul>
                    </CardDescription>
                  </CardHeader>
                </Card>
                <BeeLineChart
                  chartData={graphsData[id] ?? [{}]}
                  chartConfig={lineChartConfig}
                  className="flex-1"
                />
              </div>
            </div>
            <CustomRadialChart
              chartData={radialChartHook[id] ?? [{}]}
              chartConfig={radialConfig}
              className="w-full md:w-1/2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsWorkspace;
