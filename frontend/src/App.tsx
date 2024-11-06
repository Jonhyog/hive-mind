import { useEffect } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { HiveProvider } from "./components/custom/HiveProvider";
import { SensorProvider } from "./components/custom/SensorProvider";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GraphsPage from "./routes/Graphs";
import MonitoringPage from "./routes/Monitoring";
import ResultsPage from "./routes/Results";
import ResultDetailsPage from "./routes/ResultDetails";

import '@/i18n';

function App() {
  useEffect(() => {
    document.title = "Hive Mind - Dashboard";
  }, []);

  return (
    <Router>
      <TooltipProvider>
        <HiveProvider>
          <SensorProvider>
            <Routes>
              <Route path="/" element={<GraphsPage />} />
              <Route path="/graphs" element={<GraphsPage />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/results/:id" element={<ResultDetailsPage />} />
            </Routes>
          </SensorProvider>
        </HiveProvider>
      </TooltipProvider>
    </Router>
  );
}

export default App;
