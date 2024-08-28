import DashboardLayout from "./components/custom/DashboardLayout";
import { TooltipProvider } from "@/components/ui/tooltip"

function App() {
  return (
    <>
      <TooltipProvider>
          <DashboardLayout />
      </TooltipProvider>
    </>
  )
}

export default App
