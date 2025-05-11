// app/api/book-pdf/route.ts
import { NextResponse } from "next/server";
import { getBookPdfBySlug, getClient } from "@/sanity/lib/sanity.client";
import { readToken } from "@/sanity/lib/sanity.api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const client = getClient({ token: readToken });

  if (!slug) {
    return NextResponse.json(
      { error: "Slug parameter is required" },
      { status: 400 }
    );
  }

  try {
    const { url, originalFilename } = await getBookPdfBySlug(client, slug);

    if (!url) {
      return NextResponse.json(
        { error: "PDF not found for this book" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      url,
      originalFilename,
    });
  } catch (error) {
    console.error("Error fetching book PDF:", error);
    return NextResponse.json(
      { error: "Failed to fetch book PDF" },
      { status: 500 }
    );
  }
}
