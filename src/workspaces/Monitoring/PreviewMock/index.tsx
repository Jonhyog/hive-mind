import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { RefreshCcw } from "lucide-react";

const PreviewMock = (): JSX.Element => {
  return (
    <div className="relative flex flex-1 h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
      <Badge variant="outline" className="absolute left-3 top-3">
        Original Image
      </Badge>
      <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3"
          name="switch"
          aria-label="Playground"
          onClick={undefined}
        >
          <RefreshCcw />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        Switch view
      </TooltipContent>
    </Tooltip>
    </div>
  );
};

export default PreviewMock;
