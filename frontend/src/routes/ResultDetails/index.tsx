import DashboardLayout from "@/components/custom/DashboardLayout";
import ResultsWorkspace from "@/workspaces/Results";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ResultDetailsPage = (): JSX.Element => {
  const { id } = useParams();

  useEffect(() => {
    console.log("Current ID:", id);
  }, [id]);

  return (
    <DashboardLayout selected="results">
      <ResultsWorkspace />
    </DashboardLayout>
  );
};

export default ResultDetailsPage;
