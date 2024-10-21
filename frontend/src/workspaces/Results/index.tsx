import Combobox from "@/components/custom/Combobox";
import LineChart from "@/components/custom/LineChart";
import CustomRadialChart from "@/components/custom/RadialChart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const ResultsWorkspace = (): JSX.Element => {
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
          <Combobox initial="Lorem: 1337" options={ModelResults} />
        </div>
        <div className="w-full flex gap-2 p-4 border rounded-xl">
          <div className="flex flex-1 gap-2">
            <div className="flex flex-1 flex-col justify-between gap-4">
              <LineChart chartData={[]} chartConfig={{}} className="flex-1" />
              <CustomRadialChart
                chartData={[]}
                chartConfig={{}}
                className="flex-1"
              />
            </div>
          </div>
          <Card className="w-1/2">
            <CardHeader className="flex flex-1 w-full flex-col gap-2">
              <CardTitle>Job Summary</CardTitle>
              <CardDescription>
                <span className="w-1/2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
                explicabo tenetur praesentium, veniam unde architecto iusto illo
                non, quas deleniti culpa enim libero sed voluptas ab placeat esse
                ipsam quo corporis laboriosam molestiae pariatur. Iusto error
                laborum vel illo maiores odit ex atque quo, quasi mollitia?
                Commodi molestias nulla porro, eius possimus vero at, fugit, ad
                perferendis hic libero cum distinctio est deserunt ipsa quibusdam
                recusandae voluptates assumenda rem tempora harum labore natus
                nostrum adipisci. Rem repellendus cupiditate, iste officia
                repudiandae dolor numquam itaque sequi quibusdam fugiat aspernatur
                delectus molestiae nisi officiis fuga placeat, a natus suscipit!
                Veniam quibusdam magnam minus amet atque illo temporibus! Qui ab
                iusto deserunt aliquam praesentium nisi illo blanditiis, modi
                facilis voluptatem odit culpa? Assumenda, possimus. Consectetur
                dolore in itaque, accusantium dolorum veritatis ex beatae
                repudiandae non. Fuga exercitationem, similique voluptates
                temporibus amet possimus eligendi, fugit voluptas ut commodi
                asperiores sint. Omnis magni saepe veniam!
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        {/* <Card className="w-full">
          <CardHeader className="flex flex-1 w-full flex-col gap-2">
            <CardTitle>Job Results</CardTitle>
            <CardDescription>
              <div className="flex gap-2">
                <div className="flex flex-col w-1/2 justify-between gap-4">
                  <LineChart
                    chartData={[]}
                    chartConfig={{}}
                    className="flex-1"
                  />
                  <CustomRadialChart
                    chartData={[]}
                    chartConfig={{}}
                    className="flex-1"
                  />
                </div>
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
              </div>
            </CardDescription>
          </CardHeader>
        </Card> */}
      </div>
    </div>
  );
};

export default ResultsWorkspace;
