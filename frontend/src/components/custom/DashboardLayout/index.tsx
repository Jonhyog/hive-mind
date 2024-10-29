import React, { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Icon, SquareTerminal, Settings, Cctv, FolderClock } from "lucide-react";
import { beeHive } from "@lucide/lab";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import WorkspaceSelection from "./WorkspaceSelection";
import GraphsWorkspace from "@/workspaces/Graphs";
import VideoMonitoringWorkspace from "@/workspaces/Monitoring";
import OptionsSelectionPopover from "../OptionsSelectionPopover";
import ResultsWorkspace from "@/workspaces/Results";

const WorkspaceLabels = {
  graphs: "Graphs",
  monitoring: "Video Monitoring",
  results: "Results"
} as const;

const DashboardLayout = (): JSX.Element => {
  const [isSelected, setSelected] = useState<string>(WorkspaceLabels.graphs);

  const handleWorkspaceSelection = useCallback((e: React.MouseEvent) => {
    const workspace = e.currentTarget.getAttribute("name");

    if (workspace) {
      setSelected(workspace);
    }
  }, []);

  return (
    <div className="flex h-screen w-full">
      <aside className="inset-x-0 bottom-0 absolute z-20 flex h-[56px] md:h-screen md:w-[56px] flex-row md:flex-col border-t md:border-r md:border-t-0 bg-primary-foreground">
        <div className="hidden md:block border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Icon iconNode={beeHive} />
          </Button>
        </div>
        <nav className="flex flex-1 flex-row md:flex-col h-fit md:h-full gap-1 p-2 justify-around">
          <WorkspaceSelection
            isSelected={WorkspaceLabels.graphs === isSelected}
            workspaceName={WorkspaceLabels.graphs}
            workspaceIcon={<SquareTerminal className="size-5" />}
            onClick={handleWorkspaceSelection}
          />
          <WorkspaceSelection
            isSelected={WorkspaceLabels.monitoring === isSelected}
            workspaceName={WorkspaceLabels.monitoring}
            workspaceIcon={<Cctv className="size-5" />}
            onClick={handleWorkspaceSelection}
          />
          <WorkspaceSelection
            isSelected={WorkspaceLabels.results === isSelected}
            workspaceName={WorkspaceLabels.results}
            workspaceIcon={<FolderClock className="size-5" />}
            onClick={handleWorkspaceSelection}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg size-10"
                aria-label="Account"
              >
                <Settings className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="h-full w-screen flex flex-col md:pl-[56px]">
        <header className="absolute inset-x-0 top-0 w-screen z-10 flex">
          <div className="hidden md:block h-[57px] w-[57px]">
          </div>
          <div className="flex flex-1 h-[57px] justify-between items-center gap-1 bg-primary-foreground  border-b px-4">
            <h1 className="text-xl font-semibold">{isSelected}</h1>
            <OptionsSelectionPopover />
          </div>
        </header>
        <div className="flex flex-col flex-1 w-full p-4 mt-[57px] overflow-auto">
            {WorkspaceLabels.graphs === isSelected && <GraphsWorkspace />}
            {WorkspaceLabels.monitoring === isSelected && <VideoMonitoringWorkspace />}
            {WorkspaceLabels.results === isSelected && <ResultsWorkspace />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
