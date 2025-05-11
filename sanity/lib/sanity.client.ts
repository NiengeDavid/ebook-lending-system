import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from "@/sanity/lib/sanity.api";
import {
  type Book,
  bookBySlugQuery,
  bookPdfUrlBySlugQuery,
  bookPdfUrlQuery,
  BookPdfUrlResponse,
  BookPdfUrlResult,
  BookSearchResult,
  booksQuery,
  BorrowedBookDocument,
  categoriesQuery,
  type Category,
  checkExistingBorrowQuery,
  createBorrowedBookMutation,
  CreateBorrowResponse,
  findUserByAuthIdQuery,
  SearchBooksParams,
  searchBooksQuery,
} from "@/sanity/lib/sanity.queries";
import { createClient, type SanityClient } from "next-sanity";

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
  });

  // If preview is provided and has a token, return a client with the token
  // if (preview?.token) {
  //   return client.withConfig({
  //     token: preview.token,
  //   });
  // }

  // Otherwise, return the default client
  return client;
}

export const getSanityImageConfig = () => getClient();

export async function getAllCategories(
  client: SanityClient
): Promise<Category[]> {
  return (await client.fetch(categoriesQuery)) || [];
}

export async function getAllBooks(
  client: SanityClient
): Promise<BookSearchResult[]> {
  return (await client.fetch(booksQuery)) || [];
}

export async function getAllSearchBooks(
  client: SanityClient,
  params: SearchBooksParams
): Promise<BookSearchResult[]> {
  const queryParams = {
    searchQuery: `*${params.searchQuery}*`,
    ...(params.category && { category: params.category }),
  };

  try {
    return (
      (await client.fetch<BookSearchResult[]>(
        searchBooksQuery(params),
        queryParams
      )) || []
    );
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

export async function getAllBookBySlug(
  client: SanityClient,
  slug: string
): Promise<BookSearchResult | null> {
  return await client.fetch(bookBySlugQuery, { slug });
}

export async function getBookPdfUrl(
  client: SanityClient,
  slug: string
): Promise<string | null> {
  const result = await client.fetch<BookPdfUrlResult>(bookPdfUrlQuery, {
    slug,
  });
  return result?.url || null;
}

export async function createBorrowRecord(
  client: SanityClient,
  params: {
    authUserId: string; // From your auth provider (user.id)
    bookId: string; // Sanity book _id
  }
): Promise<CreateBorrowResponse> {
  const now = new Date();
  const dueDate = new Date();
  dueDate.setDate(now.getDate() + 14);

  // 1. Find the Sanity user document that matches the auth user ID
  const sanityUser = await client.fetch(findUserByAuthIdQuery, {
    authId: params.authUserId,
  });

  if (!sanityUser?._id) {
    throw new Error("User account not found in our system");
  }

  // 2. Check for existing borrow
  const existingBorrows = await client.fetch(checkExistingBorrowQuery, {
    userId: sanityUser._id,
    bookId: params.bookId,
  });

  if (existingBorrows > 0) {
    throw new Error("You already have this book borrowed");
  }

  // 3. Create the borrow record
  try {
    const result = await client.create({
      _type: "borrowedBook", // Must match your schema name exactly
      user: {
        _type: "reference",
        _ref: sanityUser._id,
      },
      book: {
        _type: "reference",
        _ref: params.bookId,
      },
      borrowedDate: now.toISOString(),
      dueDate: dueDate.toISOString(),
      returned: false,
    });

    console.log("Borrow record created:", result._id); // For debugging
    return result as CreateBorrowResponse;
  } catch (error) {
    console.error("Create borrow error:", error);
    throw new Error("Failed to create borrow record");
  }
}

export async function getBookPdfBySlug(
  client: SanityClient,
  slug: string
): Promise<BookPdfUrlResponse> {
  return (
    (await client.fetch<BookPdfUrlResponse>(bookPdfUrlBySlugQuery, { slug })) ||
    {}
  );
}

//   export async function getSettings(client: SanityClient): Promise<Settings> {
//     return (await client.fetch(settingsQuery)) || {}
//   }

//   export async function getAllPosts(client: SanityClient): Promise<Post[]> {
//     return (await client.fetch(indexQuery)) || []
//   }

//   export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
//     const client = getClient()
//     const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
//     return slugs.map((slug) => ({ slug }))
//   }

//   export async function getPostBySlug(
//     client: SanityClient,
//     slug: string,
//   ): Promise<Post> {
//     return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
//   }

//   export async function getPostAndMoreStories(
//     client: SanityClient,
//     slug: string,
//   ): Promise<{ post: Post; morePosts: Post[] }> {
//     return await client.fetch(postAndMoreStoriesQuery, { slug })
//   }
