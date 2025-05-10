import { BookSearchResult } from "@/sanity/lib/sanity.queries";
import Container from "./container";
import { BookDescription } from "./BookDescription";

interface BookViewProps {
  book: BookSearchResult;
}

export default function BookDetails({ book }: BookViewProps) {
  return (
    <div className="bg-white py-32">
      <Container className="flex flex-col items-start justify-between mx-auto lg:flex-row lg:items-start gap-8 p-6">
        <h2 className="w-full text-black text-start font-semibold text-2xl border-b-4 border-black pb-3 lg:text-3xl">
          About Book
        </h2>

        <div className="flex flex-col items-start gap-6 p-2">
          <h2 className="w-full text-start text-black font-semibold text-2xl pb-3lg:text-3xl">
            Details
          </h2>
          {/* Details */}
          <BookDescription text={book.details} />
        </div>
      </Container>
    </div>
  );
}
