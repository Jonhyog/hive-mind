import { useCallback, useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxOptions = {
    value: string;
    view: JSX.Element
};

type ComboboxProps = {
    initial: string;
    options: ComboboxOptions[];
    onChange?: (value: string) => void;
};

const Combobox = ({ initial, options, onChange }: ComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(initial);

  const handleChange = useCallback((currentValue: string) => {
    if (onChange) {
      onChange(currentValue)
    }
    
    setValue(currentValue)
    setOpen(false)
  }, [onChange]);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[460px] justify-between"
        >
          {value
            ? options.find((framework) => framework.value === value)?.value
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[460px] p-0">
        <Command>
          <CommandInput placeholder="Search job..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleChange}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.view}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Combobox;
