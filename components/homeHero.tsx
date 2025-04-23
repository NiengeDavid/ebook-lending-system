import Container from "@/components/container";
import SearchBar from "@/components/searchbar";
import { homeDetails } from "@/data/homeDetails";

export default function HomeHero() {
  return (
    <div className="relative bg-home-image h-full md:h-[45rem]">
      {/* Gradient overlay */}
      <div className="bg-gradient-overlay"></div>

      {/* Hero section */}
      <Container className="relative z-10">
        <div className="w-full mx-auto py-10 md:py-36">
          <div className="max-w-screen-md mx-auto w-full p-4">
            <h1 className="text-3xl font-extrabold text-white text-center md:text-5xl">
              {homeDetails.hero?.title}
            </h1>
            <p className="mt-4 text-lg text-white text-center md:mt-6 md:text-xl">
              {homeDetails.hero?.desc}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-4 md:mt-9">
            <SearchBar />
          </div>
        </div>
      </Container>
    </div>
  );
}
