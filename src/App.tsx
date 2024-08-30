import { useEffect } from "react";
import DashboardLayout from "./components/custom/DashboardLayout";
import { TooltipProvider } from "@/components/ui/tooltip"

function App() {
  useEffect(() => {
    document.title = "Hive Mind - Dashboard"
  }, []);

  return (
    <>
      <TooltipProvider>
          <DashboardLayout />
      </TooltipProvider>
    </>
  )
}

export default App
