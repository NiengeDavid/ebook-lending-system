"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Container from "./container";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { readToken } from "@/sanity/lib/sanity.api";
import {
  getClient,
  getAllBooks,
  getAllCategories,
} from "@/sanity/lib/sanity.client";
import { type Book, type Category } from "@/sanity/lib/sanity.queries";

function CategorySlider({
  category,
  books,
}: {
  category: Category;
  books: Book[];
}) {
  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 4, spacing: 4 },
    loop: true,
  });

  const categoryBooks = books.filter(
    (book) => book?.category?.title === category.title
  );

  return (
    <Container className="my-14">
      <div className="flex flex-col justify-between items-center mb-4">
        <div className="w-full flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-black">{category.title}</h2>
          <div className="space-x-2">
            <Button
              onClick={() => sliderInstance.current?.prev()}
              className="bg-primary-red cursor-pointer hover:bg-primary-red/80 p-2 py-5 rounded-full"
            >
              <ChevronLeft size={20} className="text-white" />
            </Button>
            <Button
              onClick={() => sliderInstance.current?.next()}
              className="bg-primary-red cursor-pointer hover:bg-primary-red/80 p-2 py-5 rounded-full"
            >
              <ChevronRight size={20} className="text-white" />
            </Button>
          </div>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {categoryBooks.map((book) => (
            <div key={book._id} className="keen-slider__slide">
              {/* Your book card content */}
              <div className="bg-bg2/10 rounded-xl overflow-hidden shadow-md w-[322px]">
                <Image
                  src={book.coverUrl || "/placeholder-image.jpg"}
                  alt={book.title || "Book Cover"}
                  width={322}
                  height={450}
                  className="w-92 h-[450px] object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-black">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600">{book.author}</p>
                  <div className="flex items-center text-yellow-500 text-xs mt-1">
                    {[...Array(book.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                    <span className="ml-1 text-gray-500">
                      ({book.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default function BookCarousel() {
  const client = getClient({ token: readToken });
  const [categories, setCategories] = useState<Category[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesData, booksData] = await Promise.all([
          getAllCategories(client),
          getAllBooks(client),
        ]);
        setCategories(categoriesData);
        setBooks(booksData);
        console.log("Categories:", categoriesData);
        console.log("Books:", booksData);
      } catch (error) {
        toast("Oops!", {
          description:
            "An error occurred while fetching data. Please try again later.",
        });
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white text-black py-10 px-6 space-y-16">
      <Container>
        {categories.map((category) => (
          <CategorySlider
            key={category._id}
            category={category}
            books={books}
          />
        ))}
      </Container>
    </div>
  );
}
