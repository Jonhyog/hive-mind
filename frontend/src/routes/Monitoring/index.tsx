import DashboardLayout from "@/components/custom/DashboardLayout";
import VideoMonitoringWorkspace from "@/workspaces/Monitoring";

const MonitoringPage = (): JSX.Element => {
  return (
    <DashboardLayout selected="monitoring">
      <VideoMonitoringWorkspace />
    </DashboardLayout>
  );
};

export default MonitoringPage;
