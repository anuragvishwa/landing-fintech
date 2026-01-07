import { Metadata } from "next";
import { ComparePage } from "@/components/compare/ComparePage";

export const metadata: Metadata = {
  title: "Flexdash vs Traditional Chatbot",
  description:
    "See the difference between traditional chatbots and Flexdash AI guidance",
};

export default function Page() {
  return <ComparePage />;
}
