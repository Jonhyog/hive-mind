import { useState } from "react";

import VideoUploadForm from "./VideoUploadForm";
import PreviewMock from "./PreviewMock";

import { beeHive } from "@lucide/lab";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TranslatedText from "@/components/custom/TranslatedText";
import { Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const VideoMonitoringWorkspace = (): JSX.Element => {
  const [fileUrl, setFileUrl] = useState<string | null>();

  return (
    <div className="flex flex-1 flex-col md:flex-row justify-between h-screen w-full md:w-full flex-row gap-4">
      <Card className="block md:hidden">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>
            <TranslatedText path="monitoring.title" />
          </CardTitle>
          <CardDescription>
            <span>
              <TranslatedText path="monitoring.description" />
            </span>
            <br />
            <span>
              <TranslatedText path="monitoring.notes" />
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col-reverse md:flex-col gap-4 flex-1">
        <Card className="hidden md:block">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>
              <TranslatedText path="monitoring.title" />
            </CardTitle>
            <CardDescription>
              <span>
                <TranslatedText path="monitoring.description" />
              </span>
              <br />
              <span>
                <TranslatedText path="monitoring.notes" />
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="flex flex-1 flex-col md:flex-row gap-2">
          <VideoUploadForm onFileChange={setFileUrl} />
          <div className="flex-1 flex-col items-start gap-2 md:flex h-full">
            <form className="grid w-full items-start gap-4">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Hive on the left side
                </legend>
                <div className="flex h-20 flex-1 items-center justify-between border-2 border-secondary rounded-md p-2 px-4">
                  <Icon className="w-10 h-10" iconNode={beeHive} />
                  <Separator className="bg-black/50 h-4/5" orientation="vertical" />
                  <div className="w-10 h-10"></div>
                </div>
              </fieldset>
            </form>
            <form className="grid w-full items-start gap-4">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Hive on the right side
                </legend>
                <div className="flex h-20 flex-1 flex-row-reverse items-center justify-between border-2 border-secondary p-2 px-4">
                  <Icon className="w-10 h-10" iconNode={beeHive} />
                  <Separator className="bg-black/50 h-4/5" orientation="vertical" />
                  <div className="w-10 h-10"></div>
                </div>
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
