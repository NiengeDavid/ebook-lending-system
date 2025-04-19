import BookCTA from "@/components/bookcta";
import BookCarousel from "@/components/books";
import { HomeFAQS } from "@/components/homefaqs";
import HomeHero from "@/components/homeHero";

export default function LandingPage() {
  return (
    <div className="">
      <HomeHero />
      <BookCarousel />
      <BookCTA />
      <HomeFAQS />
    </div>
  );
}
