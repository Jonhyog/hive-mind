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

import { useToast } from "@/components/ui/use-toast";
import TranslatedText from "@/components/custom/TranslatedText";

type VideoUploadFormProps = {
  onFileChange?: (fileUrl: string) => void;
};

const VideoUploadForm = ({
  onFileChange,
}: VideoUploadFormProps): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [algorithm, setAlgorithm] = useState("background-subtraction");
  const [side, setSide] = useState("left");
  const { toast } = useToast();

  const onFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement> | undefined) => {
      if (event) {
        const fileArray = event?.target?.files ?? [];
        const newUrl = URL.createObjectURL(fileArray[0]);

        setFile(fileArray[0]);

        if (onFileChange) {
          onFileChange(newUrl);
        }
      }
    },
    [onFileChange]
  );

  const onSubmit = useCallback(async () => {
    const endpoint = "http://localhost:3003/video/upload";
    const formData = new FormData();
    formData.append("video", file);
    formData.append("detector_type", algorithm);
    formData.append("side", side);

    for (const entrie of formData.entries()) {
      console.log(entrie);
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      await response.json();

      toast({
        duration: 5000,
        title: "Job created with success!",
        description: `You can check the job status and other information on the results tab.`,
      });
    } catch (error) {
      toast({
        duration: 5000,
        title: "Failed to create job.",
        description:
          "An unexpected failure happened while creating the job. Please try again.",
        variant: "destructive",
      });

      console.log("Failed to upload video: ", error);
    }
  }, [file, algorithm, side, toast]);

  return (
    <div className="relative flex-col items-start gap-8 md:flex flex-1 h-full">
      <form className="grid w-full items-start gap-4">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium"><TranslatedText path="monitoring.settings" /></legend>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="picture"><TranslatedText path="monitoring.video.title" /></Label>
            <Input
              id="picture"
              type="file"
              accept="video/mp4"
              onChange={onFileUpload}
            />
            <Label htmlFor="algo"><TranslatedText path="monitoring.algorithm.title" /></Label>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger id="algo" className="w-full">
                <SelectValue placeholder="Select a detector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="background-subtraction">
                  Background Subtraction
                </SelectItem>
                <SelectItem value="yolo">YOLO</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="side"><TranslatedText path="monitoring.side.title" /></Label>
            <Select value={side} onValueChange={setSide}>
              <SelectTrigger id="side" className="w-full">
                <SelectValue placeholder="Select a side" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left"><TranslatedText path="monitoring.side.left" /></SelectItem>
                <SelectItem value="right"><TranslatedText path="monitoring.side.right" /></SelectItem>
              </SelectContent>
            </Select>
            <Button type="button" onClick={onSubmit}>
              <TranslatedText path="monitoring.upload" />
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default VideoUploadForm;
