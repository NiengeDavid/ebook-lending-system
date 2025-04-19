import Container from "@/components/container";
import SearchBar from "@/components/searchbar";

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
              MIU’s E-Library System
            </h1>
            <p className="mt-4 text-lg text-white text-center md:mt-6 md:text-xl">
              Borderless learning just got possible with MIU's robust E-Library
              system. Whether you hail from the Sciences, Art, or Tech, you can
              learn at your convenience, borrow, lend, and study 24/7. START
              NOW!
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
