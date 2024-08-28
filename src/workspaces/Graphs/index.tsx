import LineMock from "./LineMock";
import BarMock from "./BarMock";
import RadialMock from "./RadialMock";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const GraphsWorkspace = (): JSX.Element => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-row flex-1 gap-4">
      <BarMock className="w-2/3" />
      <div className="flex flex-1 flex-col gap-2">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Lorem Ipsum</CardTitle>
            <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu elit sit amet mi hendrerit laoreet vitae eu nisl. Pellentesque.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Lorem Ipsum</CardTitle>
            <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu elit sit amet mi hendrerit laoreet vitae eu nisl. Pellentesque.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
    <div className="flex flex-row flex-1 gap-4">
        <RadialMock className="w-1/3"/>
        <LineMock className="flex-1" />
    </div>
  </div>
);

export default GraphsWorkspace;
