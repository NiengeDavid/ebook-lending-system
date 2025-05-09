import type { Metadata } from "next";

import { searchDetails } from "@/data/searchDetails";
import SearchPage from "@/containers/searchPage";

export const metadata: Metadata = {
  title: searchDetails?.pageMetadata.title,
  description: searchDetails?.pageMetadata.description,
};

export default function Search() {
  return (
    <div className="">
      <SearchPage />
    </div>
  );
}
