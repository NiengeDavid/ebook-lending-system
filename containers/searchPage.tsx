"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import HomeHero from "@/components/homeHero";
import SearchResults from "@/components/searchResult";
import Container from "@/components/container";
import { readToken } from "@/sanity/lib/sanity.api";
import { getClient } from "@/sanity/lib/sanity.client";
import {
  getAllBooks,
  getAllSearchBooks,
  getAllCategories,
} from "@/sanity/lib/sanity.client";
import {
  type BookSearchResult,
  type Category,
} from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialCategory = searchParams.get("category") || "All Categories";
  const client = getClient({ token: readToken });
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearch, setCurrentSearch] = useState({
    query: "",
    category: "All Categories",
  });
  const [hasSearched, setHasSearched] = useState(false);

  // Load initial search if URL has parameters
  useEffect(() => {
    const loadInitialSearch = async () => {
      if (initialQuery) {
        await handleSearch(initialCategory, initialQuery);
      } else {
        // Load all books if no search query
        const allBooks = await getAllBooks(client);
        setSearchResults(allBooks);
      }
    };

    loadInitialSearch();
  }, []);

  // Load all books on initial render
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsSearching(true);
        const [allBooks, categories] = await Promise.all([
          getAllBooks(client),
          getAllCategories(client),
        ]);
        setSearchResults(allBooks);
        setAvailableCategories(categories.map((c) => c.title));
        //console.log(availableCategories)
      } catch (error) {
        console.error("Failed to load initial data:", error);
        toast.error("Failed to load initial data. Please refresh the page.");
      } finally {
        setIsSearching(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSearch = async (category: string, query: string) => {
    setHasSearched(true);

    if (!query.trim() && category === "All Categories") {
      // If empty search and no category, show all books again
      const allBooks = await getAllBooks(client);
      setSearchResults(allBooks);
      setCurrentSearch({ query: "", category: "All Categories" });
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
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search failed. Please try again.");
      setSearchResults([]);
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
        categories={availableCategories}
      />

      <Container className="py-12">
        {isSearching ? (
          <div className="text-center py-20">
            <p>Searching for books...</p>
          </div>
        ) : (
          <SearchResults
            books={searchResults}
            searchQuery={hasSearched ? currentSearch.query : ""}
            category={currentSearch.category}
          />
        )}
      </Container>
    </div>
  );
}
