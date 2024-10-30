import DashboardLayout from "@/components/custom/DashboardLayout";
import GraphsWorkspace from "@/workspaces/Graphs";

const GraphsPage = (): JSX.Element => {
  return (
    <DashboardLayout selected="graphs">
      <GraphsWorkspace />
    </DashboardLayout>
  );
};

export default GraphsPage;
