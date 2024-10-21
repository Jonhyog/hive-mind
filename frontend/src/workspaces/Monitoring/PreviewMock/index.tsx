import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

type VideoPreviewProps = {
  videoUrl?: string | null;
};

const VideoPreview = ({ videoSrc }: { videoSrc: string }): JSX.Element => {
  return (
    <video controls className="rounded-xl bg-black">
      <source src={videoSrc} type="video/mp4" className="w-full rounded-xl" />
    </video>
  );
};
const PreviewMock = ({ videoUrl }: VideoPreviewProps): JSX.Element => {
  return (
    <div className="flex-1 max-h-full rounded-xl">
      <AspectRatio ratio={16 / 9} className="flex content-end bg-muted rounded-xl max-h-full">
        <Badge variant="outline" className="absolute bg-muted left-3 top-3">
          {videoUrl !== "" && videoUrl ? "Original Video" : "No Video"}
        </Badge>
        {videoUrl !== "" && videoUrl && (<VideoPreview videoSrc={videoUrl} />)}
      </AspectRatio>
    </div>
  );
};

export default PreviewMock;
