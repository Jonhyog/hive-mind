import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

type ContextSelectorProps = {
  label?: string;
  options: string[];
  selected: string;
  onSelect?: (value: string) => void;
};

const ContextSelector = ({
  label,
  options,
  selected,
  onSelect,
}: ContextSelectorProps): JSX.Element => {
  const [sensor, setSensor] = useState(selected);

  const onChange = useCallback(
    (value: string) => {
      if (onSelect) {
        onSelect(value);
      }
      setSensor(value);
    },
    [onSelect]
  );

  useEffect(() => {
    setSensor(selected);
  }, [selected]);

  const select = useMemo(() => {
    return (
      <Select value={sensor} onValueChange={onChange}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select a sensor to preview" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((options) => (
              <SelectItem value={options}>{options}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }, [sensor, onChange, options]);

  return (
    <div className="flex flex-1 flex-col gap-2">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      {sensor !== "" && select}
      {sensor === "" && (
        <p className="text-sm text-muted-foreground">
          No available options
        </p>
      )}
    </div>
  );
};

export default memo(ContextSelector);
