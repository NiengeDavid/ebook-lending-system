import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookSearchResult } from "@/sanity/lib/sanity.queries";
import Container from "./container";
import { BookDescription } from "./BookDescription";

interface BookViewProps {
  book: BookSearchResult;
}

export default function BookView({ book }: BookViewProps) {
  return (
    <div className="bg-white">
      <Container className="flex flex-col items-center lg:flex-row lg:items-start gap-8 p-6 text-gray-800">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <Image
            src={book?.coverUrl || "/default-cover.jpg"}
            alt={`${book.title} cover`}
            width={256}
            height={350}
            className="shadow-lg"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <h2 className="text-lg text-red-700 font-semibold mb-2">
            {book.author}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="text-yellow-400">
              {"★".repeat(book.rating)}
              {"☆".repeat(5 - book.rating)}
            </div>
            <span className="text-sm text-gray-600">
              ({book.reviews} reviews)
            </span>
            <div className="text-gray-500">☆☆☆☆☆</div>
            <span className="text-sm text-gray-600 cursor-pointer">
              Rate this book
            </span>
          </div>

          {/* Description */}
          <BookDescription text={book.description} />

          <a className="text-yellow-600 font-semibold cursor-pointer">
            Read more
          </a>
        </div>

        {/* Book Availability */}
        <div className="w-64 border p-4 rounded shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b pb-3">
            Book Availability
          </h3>

          <Button className="w-full bg-red-600 hover:bg-red-700 text-white my-6">
            Borrow Book
          </Button>
          <Button variant="outline" className="w-full mb-12">
            Preview Book
          </Button>

          <h4 className="text-base font-semibold border-t pt-3">
            Return Policy
          </h4>
          <p className="text-sm text-gray-700">
            Free return within 14 days for ALL eligible items. {""}
            <span className="text-yellow-600 cursor-pointer">Learn more</span>
          </p>
        </div>
      </Container>
    </div>
  );
}
