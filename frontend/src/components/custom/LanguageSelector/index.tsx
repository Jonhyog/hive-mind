import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const options = [
    "en-US",
    "pt-BR"
];

const LanguageSelector = (): JSX.Element => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  
  const onChange = useCallback((value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  }, [i18n]);

  return (
    <Select value={language} onValueChange={onChange}>
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
};

export default memo(LanguageSelector);
