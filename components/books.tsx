"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";
import Container from "./container";
import { Button } from "./ui/button";
import Image from "next/image";

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  reviews: number;
  category: "Science" | "Technology" | "Arts" | "Research";
};

const books: Book[] = [
  // Arts
  {
    id: 1,
    title: "One dark window",
    author: "Rachel Gillig",
    cover: "/books/one-dark-window.png",
    rating: 5,
    reviews: 66,
    category: "Arts",
  },
  {
    id: 2,
    title: "Throne of Glass",
    author: "Sarah J. Maas",
    cover: "/books/throne-of-glass.png",
    rating: 5,
    reviews: 66,
    category: "Arts",
  },
  {
    id: 3,
    title: "Building LLM Powered Apps",
    author: "Valentina Alto",
    cover: "/books/llm-app.png",
    rating: 5,
    reviews: 66,
    category: "Arts",
  },
  {
    id: 4,
    title: "English Grammar in Use",
    author: "Raymond Murphy",
    cover: "/books/english-grammer.png",
    rating: 5,
    reviews: 66,
    category: "Arts",
  },

  // Technology
  {
    id: 5,
    title: "Python Crash Course",
    author: "Eric Matthes",
    cover: "/books/python-crash.png",
    rating: 5,
    reviews: 66,
    category: "Technology",
  },
  {
    id: 6,
    title: "The Let Them Theory",
    author: "Mel Robbins",
    cover: "/books/let-them.png",
    rating: 5,
    reviews: 66,
    category: "Technology",
  },
  {
    id: 7,
    title: "Deepseek: Master AI in 2025",
    author: "César J. Sánchez M.",
    cover: "/books/deepseek.png",
    rating: 5,
    reviews: 66,
    category: "Technology",
  },
  {
    id: 8,
    title: "I Who Have Never Known Men",
    author: "Jacqueline Harpman",
    cover: "/books/never-known-men.png",
    rating: 5,
    reviews: 66,
    category: "Technology",
  },

  // Science
  {
    id: 9,
    title: "The Let Them Theory",
    author: "Mel Robbins",
    cover: "/books/let-them.png",
    rating: 5,
    reviews: 66,
    category: "Science",
  },
  {
    id: 10,
    title: "Deepseek: Master AI in 2025",
    author: "César J. Sánchez M.",
    cover: "/books/deepseek.png",
    rating: 5,
    reviews: 66,
    category: "Science",
  },
  {
    id: 11,
    title: "Python Crash Course",
    author: "Eric Matthes",
    cover: "/books/python-crash.png",
    rating: 5,
    reviews: 66,
    category: "Science",
  },
  {
    id: 12,
    title: "I Who Have Never Known Men",
    author: "Jacqueline Harpman",
    cover: "/books/never-known-men.png",
    rating: 5,
    reviews: 66,
    category: "Science",
  },

  // Research
  {
    id: 13,
    title: "English Grammar in Use",
    author: "Raymond Murphy",
    cover: "/books/english-grammer.png",
    rating: 5,
    reviews: 66,
    category: "Research",
  },
  {
    id: 14,
    title: "One dark window",
    author: "Rachel Gillig",
    cover: "/books/one-dark-window.png",
    rating: 5,
    reviews: 66,
    category: "Research",
  },
  {
    id: 15,
    title: "Throne of Glass",
    author: "Sarah J. Maas",
    cover: "/books/throne-of-glass.png",
    rating: 5,
    reviews: 66,
    category: "Research",
  },
  {
    id: 16,
    title: "Building LLM Powered Apps",
    author: "Valentina Alto",
    cover: "/books/llm-app.png",
    rating: 5,
    reviews: 66,
    category: "Research",
  },
];

const categories = ["Science", "Technology", "Arts", "Research"] as const;

export default function BookCarousel() {
  return (
    <div className="bg-white text-black py-10 px-6 space-y-16">
      <Container>
        {categories.map((category) => {
          const categoryBooks = books.filter(
            (book) => book.category === category
          );
          const sliderRef = useRef(null);
          const [sliderInstanceRef, instance] = useKeenSlider<HTMLDivElement>({
            slides: { perView: 4, spacing: 4 },
            loop: true,
          });

          return (
            <div key={category} className="my-14">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-black">{category}</h2>
                <div className="space-x-2">
                  <Button
                    onClick={() => instance.current?.prev()}
                    className="bg-primary-red cursor-pointer hover:bg-primary-red/80 p-2 py-5 rounded-full"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </Button>
                  <Button
                    onClick={() => instance.current?.next()}
                    className="bg-primary-red cursor-pointer hover:bg-primary-red/80 p-2 py-5 rounded-full"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </Button>
                </div>
              </div>

              <div ref={sliderInstanceRef} className="keen-slider">
                {categoryBooks.map((book) => (
                  <div key={book.id} className="keen-slider__slide">
                    <div className="bg-bg2/10 rounded-xl overflow-hidden shadow-md w-[322px]">
                      <Image
                        src={book.cover}
                        alt={book.title}
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
          );
        })}
      </Container>
    </div>
  );
}
