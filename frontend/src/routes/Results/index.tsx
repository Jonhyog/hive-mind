import DashboardLayout from "@/components/custom/DashboardLayout";
import ResultsWorkspace from "@/workspaces/Results";

const ResultsPage = (): JSX.Element => {
  return (
    <DashboardLayout selected="results">
      <ResultsWorkspace />
    </DashboardLayout>
  );
};

export default ResultsPage;
