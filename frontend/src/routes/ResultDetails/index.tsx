import DashboardLayout from "@/components/custom/DashboardLayout";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ResultDetailsPage = (): JSX.Element => {
  const { id } = useParams();

  useEffect(() => {
    console.log("Current ID:", id);
  }, [id]);

  return (
    <DashboardLayout selected="results">
      <div>Work in Progress</div>
    </DashboardLayout>
  );
};

export default ResultDetailsPage;
