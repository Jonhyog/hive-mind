import { useEffect } from "react";
import DashboardLayout from "./components/custom/DashboardLayout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HiveProvider } from "./components/custom/HiveProvider";

function App() {
  useEffect(() => {
    document.title = "Hive Mind - Dashboard";
  }, []);

  return (
    <>
      <TooltipProvider>
        <HiveProvider>
          <DashboardLayout />
        </HiveProvider>
      </TooltipProvider>
    </>
  );
}

export default App;
