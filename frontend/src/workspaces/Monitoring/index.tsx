import { useState } from "react";

import VideoUploadForm from "./VideoUploadForm";
import PreviewMock from "./PreviewMock";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VideoMonitoringWorkspace = (): JSX.Element => {
  const [fileUrl, setFileUrl] = useState<string | null>();

  return (
    <div className="flex flex-1 flex-col md:flex-row justify-between h-screen w-full md:w-full flex-row gap-4">
      <Card className="block md:hidden">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>Video Upload</CardTitle>
          <CardDescription>
            Select a video and upload it to automatically process how many bees
            were detected in frame during the run time of the video. Note: This
            might take a while to process but you can see the results and the
            processing status in the Results tab.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col-reverse md:flex-col gap-4 flex-1">
        <Card className="hidden md:block">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>Video Upload</CardTitle>
            <CardDescription>
              Select a video and upload it to automatically process how many
              bees were detected in frame during the run time of the video.
              Note: This might take a while to process but you can see the
              results and the processing status in the Results tab.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="flex flex-1 flex-col md:flex-row gap-2">
          <VideoUploadForm onFileChange={setFileUrl} />
          <div className="flex-1 flex-col items-start gap-8 md:flex h-full">
            <form className="grid w-full items-start gap-4">
              <fieldset className="grid gap-6 rounded-lg border md:h-[247px] p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Reserved
                </legend>
              </fieldset>
            </form>
          </div>
        </div>
        <PreviewMock className="block md:hidden" videoUrl={fileUrl} />
      </div>
      <PreviewMock className="hidden md:block" videoUrl={fileUrl} />
    </div>
  );
};

export default VideoMonitoringWorkspace;
