import { useTranslation } from "react-i18next";

type TranslatedTextProps = {
    path: string;
    capitalize?: boolean;
}

const capitalizeString = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const TranslatedText = ({ path, capitalize }: TranslatedTextProps) => {
  const { t } = useTranslation();

  return capitalize ? capitalizeString(t(path)) : t(path);
}

export default TranslatedText;