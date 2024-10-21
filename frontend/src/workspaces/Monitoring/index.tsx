import { useState } from "react";

import VideoUploadForm from "./VideoUploadForm";
import PreviewMock from "./PreviewMock";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const VideoMonitoringWorkspace = (): JSX.Element => {
  const [fileUrl, setFileUrl] = useState<string | null>();

  return (
    <div className="flex flex-1 flex-col md:flex-row justify-between h-screen w-full md:w-full flex-row gap-4">
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <div className="flex flex-col flex-1 gap-4 w-full md:w-1/3 md:pr-0">
          <Card>
            <CardHeader className="flex flex-col gap-2">
              <CardTitle>Video Upload</CardTitle>
              <CardDescription>
                Select a video and upload it to automatically process how many bees were detected in
                frame during the run time of the video. Note: This might take a while to process but
                you can see the results and the processing status in the Results tab.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <VideoUploadForm onFileChange={setFileUrl} />
      </div>
      <PreviewMock videoUrl={fileUrl}/>
    </div>
  );
}

export default VideoMonitoringWorkspace;
