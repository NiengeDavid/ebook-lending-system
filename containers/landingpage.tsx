// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import BookCTA from "@/components/bookcta";
import BookCarousel from "@/components/books";
import { HomeFAQS } from "@/components/homefaqs";
import HomeHero from "@/components/homeHero";

export default function LandingPage() {
  const router = useRouter();

  const handleSearch = (category: string, query: string) => {
    // Create URL with search parameters
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (category && category !== "All Categories")
      params.set("category", category);

    // Redirect to search page with parameters
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="">
      <HomeHero onSearch={handleSearch} />
      <BookCarousel />
      <BookCTA />
      <HomeFAQS />
    </div>
  );
}
