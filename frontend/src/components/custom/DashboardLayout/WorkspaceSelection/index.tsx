import { memo } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type WorkspaceSelectionProps = {
  isSelected?: boolean;
  workspaceName: string;
  workspaceIcon: JSX.Element;
  onClick: (e: React.MouseEvent) => void;
};

const WorkspaceSelection = ({
  isSelected = false,
  workspaceName,
  workspaceIcon,
  onClick,
}: WorkspaceSelectionProps): JSX.Element => {
  const selectedStyle = isSelected ? "rounded-lg bg-muted" : "rounded-lg";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={selectedStyle}
          name={workspaceName}
          aria-label="Playground"
          onClick={onClick}
        >
          {workspaceIcon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {workspaceName}
      </TooltipContent>
    </Tooltip>
  );
};

export default memo(WorkspaceSelection);
