import HomePage from "@/containers/homepage";
import type { Metadata } from "next";

import { indexDetails } from "@/data/indexDetails";

export const metadata: Metadata = {
  title: indexDetails?.pageMetadata.title,
  description: indexDetails?.pageMetadata.description,
};

export default function Index() {
  return (
    <div className="">
      <HomePage />
    </div>
  );
}
