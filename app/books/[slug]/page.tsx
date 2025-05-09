// app/books/[slug]/page.tsx
import { getClient } from "@/sanity/lib/sanity.client";
import { getAllBookBySlug } from "@/sanity/lib/sanity.client";
import { readToken } from "@/sanity/lib/sanity.api";
import Image from "next/image";
import { Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Container from "@/components/container";
import BookView from "@/components/viewBook";

export default async function BookPage({
  params,
}: {
  params: { slug: string };
}) {
  const client = getClient({ token: readToken });

  const book = await getAllBookBySlug(client, params.slug);

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

      {/* Book Details */}
      <BookView book={book} />
    </div>
  );
}
