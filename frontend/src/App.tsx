import { useEffect } from "react";
import DashboardLayout from "./components/custom/DashboardLayout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HiveProvider } from "./components/custom/HiveProvider";
import { SensorProvider } from "./components/custom/SensorProvider";

function App() {
  useEffect(() => {
    document.title = "Hive Mind - Dashboard";
  }, []);

  return (
    <>
      <TooltipProvider>
        <HiveProvider>
          <SensorProvider>
            <DashboardLayout />
          </SensorProvider>
        </HiveProvider>
      </TooltipProvider>
    </>
  );
}

export default App;
