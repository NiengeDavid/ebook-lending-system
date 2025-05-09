"use client";

import { BookSearchResult } from "@/sanity/lib/sanity.queries";
import Image from "next/image";
import { Star } from "lucide-react";

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
          No books found for "{searchQuery}"{" "}
          {category !== "All Categories" ? `in ${category}` : ""}
        </h3>
        <p className="text-gray-600 mt-2">Try different search terms</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">
        Results for "{searchQuery}"{" "}
        {category !== "All Categories" ? `in ${category}` : ""}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-64">
              <Image
                src={book.coverUrl || "/placeholder-book.jpg"}
                alt={book.coverAlt || "Book Cover"}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{book.title}</h3>
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
        ))}
      </div>
    </div>
  );
}
