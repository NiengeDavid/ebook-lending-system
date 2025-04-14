import VerifyPage from "@/containers/verifypage";
import type { Metadata } from "next";
import { verifyDetails } from "@/data/verifyDetails";

export const metadata: Metadata = {
  title: verifyDetails?.pageMetadata.title,
  description: verifyDetails?.pageMetadata.description,
};

export default function Verify() {
  return (
    <div className="">
      <VerifyPage />
    </div>
  );
}
