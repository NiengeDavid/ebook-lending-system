"use client";

import { useState, useEffect, use } from "react";
import type { Metadata } from "next";
import { bookDetails } from "@/data/bookDetails";
import { getClient } from "@/sanity/lib/sanity.client";
import { getAllBookBySlug } from "@/sanity/lib/sanity.client";
import { readToken } from "@/sanity/lib/sanity.api";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Container from "@/components/container";
import BookView from "@/components/viewBook";
import BookDetails from "@/components/bookDetails";
import { BookSearchResult } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";

// export const metadata: Metadata = {
//   title: bookDetails?.pageMetadata.title,
//   description: bookDetails?.pageMetadata.description,
// };

export default function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [booksData, setBooksData] = useState<BookSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const client = getClient({ token: readToken });
  const { slug } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const bookData = await getAllBookBySlug(client, slug);
        setBooksData(bookData);
        //console.log("Books:", bookData);
      } catch (error) {
        toast.error("Oops!", {
          description:
            "An error occurred while fetching data. Please try again later.",
        });
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, []);

  // const book = await getAllBookBySlug(client, params.slug);

  if (!booksData) {
    return <div className="h-screen p-4">Book not found</div>;
  }

  return (
    <div className="py-8">
      {/* Breadcrumbs */}
      <Container className="bg-[#F1F1F1] p-2 py-4 mb-6 rounded-md">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/home">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/search">Books</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{booksData?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Container>

      {/* Book Description */}
      <BookView book={booksData} />

      {/* Book Details */}
      <BookDetails book={booksData} />
    </div>
  );
}
