import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "./container";
import { homeDetails } from "@/data/homeDetails";

const bkk1 = "/books/one-dark-window.png";
const bkk2 = "/books/llm-app.png";
const bkk3 = "/books/deepseek.png";

export default function BookCTA() {
  return (
    <section className="bg-bg3 text-white pt-32 pb-60 px-6 md:pt-16 md:pb-32 md:px-20 ">
      <Container className="flex max-w-screen-lg flex-col mx-auto md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="max-w-md space-y-6">
          <h2 className="text-4xl font-bold leading-snug">
            Take a pick in our <br />
            thousands of book <br />
            collections
          </h2>
          <Link
            href={homeDetails.bookCta?.link?.lnk}
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium py-3 px-6 rounded-full hover:bg-gray-100 transition"
          >
            {homeDetails.bookCta?.link?.title}
            <ArrowRight
              className="bg-bg3 text-white p-0.5 w-6 h-6 rounded-full"
              size={18}
            />
          </Link>
        </div>

        {/* Book Covers */}
        <div className="relative mt-10 h-[300px] w-[250px] md:w-[390px] md:h-[450px]">
          {/* Book 1 (back) */}
          <Image
            src={homeDetails.bookCta?.img?.bkk1}
            alt="One Dark Window"
            width={322}
            height={450}
            className="absolute top-0 left-24 rounded shadow-lg"
          />
          {/* Book 2 (middle) */}
          <Image
            src={homeDetails.bookCta?.img?.bkk2}
            alt="LLM Book"
            width={322}
            height={450}
            className="absolute top-12 left-12 rounded shadow-lg z-10"
          />
          {/* Book 3 (front) */}
          <Image
            src={homeDetails.bookCta?.img?.bkk3}
            alt="Deepseek"
            width={322}
            height={450}
            className="absolute top-24 left-0 rounded shadow-lg z-20"
          />
        </div>
      </Container>
    </section>
  );
}
