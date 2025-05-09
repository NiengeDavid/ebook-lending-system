"use client";

import { BookSearchResult } from "@/sanity/lib/sanity.queries";
import Image from "next/image";
import { Star } from "lucide-react";
import Container from "./container";
import Link from "next/link";

export default function SearchResults({
  books,
  searchQuery,
  category,
}: {
  books: BookSearchResult[];
  searchQuery: string;
  category: string;
}) {
  if (books.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold">
          {searchQuery
            ? `No books found for "${searchQuery}" ${category !== "All Categories" ? `in ${category}` : ""}`
            : "No books available"}
        </h3>
        <p className="text-gray-600 mt-2">
          {searchQuery
            ? "Try different search terms"
            : "Please check back later"}
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <Container>
        <h2 className="text-2xl font-bold mb-6 lg:text-4xl lg:mb-10">
          {searchQuery
            ? `Results for "${searchQuery}" ${category !== "All Categories" ? `in ${category}` : ""}`
            : "Browse All Books"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link
              href={`/books/${book?.slug}`}
              key={book._id}
              className="group" // Added group for hover effects
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-[322px] mx-auto group-hover:scale-[1.02] transition-transform duration-200">
                <div className="relative w-[322px] h-[450px]">
                  <Image
                    src={book.coverUrl || "/placeholder-book.jpg"}
                    alt={book.coverAlt || "Book Cover"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 322px"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < book.rating ? "currentColor" : "none"}
                        strokeWidth={i < book.rating ? 0 : 1}
                        className={`${i < book.rating ? "text-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({book.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
