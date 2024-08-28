import React, { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Icon, SquareTerminal, LifeBuoy, Settings, Cctv } from "lucide-react";
import { beeHive } from "@lucide/lab";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import WorkspaceSelection from "./WorkspaceSelection";
import GraphsWorkspace from "@/workspaces/Graphs";
import VideoMonitoringWorkspace from "@/workspaces/Monitoring";

const WorkspaceLabels = {
  graphs: "Graphs",
  monitoring: "Video Monitoring",
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
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Icon iconNode={beeHive} />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
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
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <Settings className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">{isSelected}</h1>
        </header>
        <div className="flex flex-col flex-1 p-4">
            {WorkspaceLabels.graphs === isSelected && <GraphsWorkspace />}
            {WorkspaceLabels.monitoring === isSelected && <VideoMonitoringWorkspace />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
