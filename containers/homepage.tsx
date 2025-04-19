import Container from "@/components/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import IndexHeader from "@/components/indexHeader";

import { indexDetails } from "@/data/indexDetails";

export default function HomePage() {
  return (
    <>
      <IndexHeader />
      {/* Hero section */}
      <Container>
        <div className="mt-8 max-w-screen-xl flex flex-col justify-between items-center mx-auto gap-4 lg:mt-20 lg:gap-4 lg:flex-row">
          {/* Details block */}
          <div className="text-center max-w-2xl md:text-left md:max-w-md">
            <h1 className="text-4xl font-bold text-primary-text mb-6">
              {indexDetails.title}
            </h1>
            <p className="text-lg text-secondary-text mb-8">
              {indexDetails.description}
            </p>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <Link href="/login">
                <Button className="w-full bg-bg1 border border-bg1 py-3 md:py-6 px-8 text-lg font-medium hover:bg-transparent hover:text-black sm:w-auto cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border border-bg1 py-3 md:py-6 px-8 text-lg font-medium hover:bg-bg1 hover:text-white sm:w-auto cursor-pointer"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Video */}
          <div className="w-full h-[652px] max-w-md mt-8 md:mt-0 md:max-w-md lg:max-w-2xl">
            <video
              className="w-full h-full object-cover rounded-3xl shadow-lg"
              controls
              autoPlay
              loop
              muted
            >
              <source src={indexDetails.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Container>
    </>
  );
}
