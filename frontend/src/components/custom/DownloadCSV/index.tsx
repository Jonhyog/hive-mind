import { Button } from "@/components/ui/button";
import { useCallback, useRef } from "react";
import TranslatedText from "../TranslatedText";

interface CSVData {
  [U: string]: string | number;
}

type DownloadCSVProps = {
  header: string[],
  data: CSVData[],
  fileName: string
}

const convertToCSV = (header: string[], data: CSVData[]) => {
  const rows = Object.values(data).map((row) => {
    const orderedRow = header.map((key) => row[key]);

    return orderedRow.join(";");
  });

  return [header.join(";"), ...rows].join("\n");
}

const DownloadCSV = ({ header, data, fileName }: DownloadCSVProps) => {
  const downloadRef = useRef<HTMLDivElement>(null);

  const onDownload = useCallback(() => {
    const link = document.createElement("a");

    const csvData = new Blob([convertToCSV(header, data)], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);

    link.href = csvURL;
    link.download = `${fileName}.csv`;

    downloadRef.current!.appendChild(link);

    link.click();

    downloadRef.current!.removeChild(link);
  }, [data, fileName, header]);

  return (
    <div className="flex flex-col justify-end flex-1" ref={downloadRef}>
      <Button type="button" onClick={onDownload}><TranslatedText path="graphs.table.export" /></Button>
    </div>
  );
}

export default DownloadCSV;