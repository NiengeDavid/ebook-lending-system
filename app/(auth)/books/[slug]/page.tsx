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

export const metadata: Metadata = {
  title: bookDetails?.pageMetadata.title,
  description: bookDetails?.pageMetadata.description,
};

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BookPage({ params }: PageProps) {
  const client = getClient({ token: readToken });
  const slug = params.slug; // Destructure after the async context is established

  const book = await getAllBookBySlug(client, slug);

  if (!book) {
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
              <BreadcrumbPage>{book.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Container>

      {/* Book Description */}
      <BookView book={book} />

      {/* Book Details */}
      <BookDetails book={book} />
    </div>
  );
}
