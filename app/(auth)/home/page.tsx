import LandingPage from "@/containers/landingpage";
import type { Metadata } from "next";

import { homeDetails } from "@/data/homeDetails";

export const metadata: Metadata = {
  title: homeDetails?.pageMetadata.title,
  description: homeDetails?.pageMetadata.description,
};

export default function Home() {
    
  return (
    <div className="">
     <LandingPage />
    </div>
  );
}