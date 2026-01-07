import { Metadata } from "next";
import { VideoPage } from "@/components/video/VideoPage";

export const metadata: Metadata = {
  title: "Flexdash Product Demo",
  description: "Interactive product demonstration showcasing key features",
};

export default function Page() {
  return <VideoPage />;
}
