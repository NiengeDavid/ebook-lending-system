"use client";

import { useState } from "react";
import HomeHero from "@/components/homeHero";
import SearchResults from "@/components/searchResult";
import Container from "@/components/container";
import { readToken } from "@/sanity/lib/sanity.api";
import { getClient } from "@/sanity/lib/sanity.client";
import { getAllSearchBooks } from "@/sanity/lib/sanity.client";
import { BookSearchResult } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";

export default function SearchPage() {
  const client = getClient({ token: readToken });
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearch, setCurrentSearch] = useState({
    query: "",
    category: "All Categories",
  });

  const handleSearch = async (category: string, query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setCurrentSearch({ query, category });

    try {
      const results = await getAllSearchBooks(client, {
        searchQuery: query,
        category: category !== "All Categories" ? category : undefined,
      });
      setSearchResults(results);
      console.log("Search results:", results);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
      toast("Failed to search books. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen">
      <HomeHero
        onSearch={handleSearch}
        initialCategory={currentSearch.category}
        initialQuery={currentSearch.query}
      />

      <Container className="py-12">
        {isSearching ? (
          <div className="text-center py-20">
            <p>Searching for books...</p>
          </div>
        ) : (
          <SearchResults
            books={searchResults}
            searchQuery={currentSearch.query}
            category={currentSearch.category}
          />
        )}
      </Container>
    </div>
  );
}
