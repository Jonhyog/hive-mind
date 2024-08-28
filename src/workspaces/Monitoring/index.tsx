import AdjustmentsMock from "./AdjustmentsMock";
import PreviewMock from "./PreviewMock";

const VideoMonitoringWorkspace = (): JSX.Element => (
  <div className="flex flex-1 flex-row gap-4">
    <AdjustmentsMock />
    <PreviewMock />
  </div>
);

export default VideoMonitoringWorkspace;
