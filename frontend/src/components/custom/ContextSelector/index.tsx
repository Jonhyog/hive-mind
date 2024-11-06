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
import TranslatedText from "../TranslatedText";

export type ContexOptions = {
  label: string;
  value: string;
};

type ContextSelectorProps = {
  label?: string;
  options: ContexOptions[];
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
              <SelectItem value={options.value}>{options.value} - {options.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }, [sensor, onChange, options]);

  return (
    <div className="flex flex-1 flex-col gap-2">
      <Label className="text-sm text-muted-foreground"><TranslatedText path={label ?? ""} /></Label>
      {sensor !== "" && select}
      {sensor === "" && (
        <p className="text-sm text-muted-foreground">
          <TranslatedText path="quickConfig.unavailable" />
        </p>
      )}
    </div>
  );
};

export default memo(ContextSelector);
