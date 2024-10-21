import { ChangeEvent, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VideoUploadFormProps = {
  onFileChange?: (fileUrl: string) => void;
};

const VideoUploadForm = ({ onFileChange }: VideoUploadFormProps): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [side, setSide] = useState("left");

  const onFileUpload = useCallback((event: ChangeEvent<HTMLInputElement> | undefined) => {
    if (event) {
      const fileArray = event?.target?.files ?? [];
      const newUrl = URL.createObjectURL(fileArray[0]);

      setFile(fileArray[0]);

      if (onFileChange) {
        onFileChange(newUrl);
      }
    }
  }, [onFileChange]);

  const onSubmit = useCallback(() => {
    console.log("Uploading...");
    console.log("TODO: Actually make POST request");
    console.log("Data:", { file, side });
  }, []);

  return (
    <div
      className="relative flex-col items-start gap-8 md:flex h-full"
    >
      <form className="grid w-full items-start gap-4">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" accept="video/mp4" onChange={onFileUpload}/>
            <Label htmlFor="side">Side where hive is located</Label>
            <Select value={side} onValueChange={setSide}>
              <SelectTrigger id="side" className="w-full">
                <SelectValue placeholder="Select a side" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
            <Button type="button" onClick={onSubmit}>Upload Video</Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default VideoUploadForm;
