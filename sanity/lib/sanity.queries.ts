import { groq } from "next-sanity";

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`;

// export const settingsQuery = groq`*[_type == "settings"][0]`;
export const categoriesQuery = groq`*[_type == "category"] {
    _id,
    _createdAt,
    title,
    slug,
    description,
  } | order(title asc)`;

export const booksQuery = groq`*[_type == "book"] {
    _id,
    _createdAt,
    "slug": slug.current,
    description,
    details,
    title,
    author,
    rating,
    reviews,
    "coverUrl": cover.asset->url,
    "coverAlt": cover.alt,
    "category": category->{
      _id,
      title,
      slug
    },
    "bookFile": {
      "url": bookFile.asset->url,
      "originalFilename": bookFile.asset->originalFilename,
      "size": bookFile.asset->size
    }
  } | order(_createdAt desc)`;

export const booksByCategoryQuery = groq`*[_type == "category" && slug.current == $slug] {
    _id,
    title,
   "slug": slug.current,
    description,
    details,
    "books": *[_type == "book" && references(^._id)] {
      _id,
      title,
      author,
      rating,
      "coverUrl": cover.asset->url,
      "bookFileUrl": bookFile.asset->url
    }
  }[0]`;

export const bookDetailQuery = groq`*[_type == "book" && _id == $id] {
    _id,
    title,
    author,
    "slug": slug.current,
    description,
    details,
    rating,
    reviews,
    "cover": {
      "url": cover.asset->url,
      "alt": cover.alt,
      "dimensions": cover.asset->metadata.dimensions
    },
    "category": category->{
      _id,
      title,
      slug,
      description
    },
    "bookFile": {
      "url": bookFile.asset->url,
      "originalFilename": bookFile.asset->originalFilename,
      "size": bookFile.asset->size,
      "mimeType": bookFile.asset->mimeType
    }
  }[0]`;

export const searchBooksQuery = (params: {
  searchQuery: string;
  category?: string;
}) => groq`
  *[_type == "book" && (
    title match $searchQuery ||
    author match $searchQuery ||
    category->title match $searchQuery
  )${params?.category ? `[category->title == $category]` : ``}] {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    description,
    details,
    author,
    rating,
    reviews,
    "coverUrl": cover.asset->url,
    "coverAlt": cover.alt,
    "category": category->{
      _id,
      title,
      slug
    },
    "bookFile": {
      "url": bookFile.asset->url,
      "originalFilename": bookFile.asset->originalFilename,
      "size": bookFile.asset->size
    }
  } | order(_createdAt desc)
`;

export const bookBySlugQuery = groq`*[_type == "book" && slug.current == $slug][0] {
  _id,
  title,
  author,
  description,
  rating,
  reviews,
  details,
  "slug": slug.current,
  "coverUrl": cover.asset->url,
  "coverAlt": cover.alt,
  "category": category->{
    _id,
    title,
    "slug": slug.current
  },
  "bookFile": {
    "url": bookFile.asset->url,
    "originalFilename": bookFile.asset->originalFilename,
    "size": bookFile.asset->size
  }
}`;

export const bookPdfUrlQuery = groq`
  *[_type == "book" && slug.current == $slug][0] {
    "url": bookFile.asset->url
  }
`;

export const createBorrowedBookMutation = groq`
  *[_type == "user" && userId == $userId] {
    _id,
    "borrowedBook": *[_type == "borrowedBook" && user._ref == ^._id && book._ref == $bookId && returned == false]
  }[0]
`;

export const findUserByAuthIdQuery = groq`
  *[_type == "user" && userId == $authId][0] {
    _id
  }
`;

export const checkExistingBorrowQuery = groq`
  count(*[
    _type == "borrowedBook" && 
    user._ref == $userId && 
    book._ref == $bookId &&
    returned == false
  ])
`;

export const bookPdfUrlBySlugQuery = groq`
  *[_type == "book" && slug.current == $slug][0] {
    "url": bookFile.asset->url
  }
`;

export const getOverdueBooksQuery = groq`
  *[_type == "borrowedBook" && 
     user._ref == $userRef && 
    returned == false &&
    dueDate < now()] {
    _id,
    book-> {
      title,
      slug
    },
    borrowedDate,
    dueDate
  }
`;

//TYPES
// export interface Book {
//   _id: string;
//   _type: "book";
//   _createdAt: string;
//   _updatedAt: string;
//   _rev: string;
//   title: string;
//   author: string;
//   cover: {
//     _type: "image";
//     asset: {
//       _ref: string;
//       _type: "reference";
//     };
//   };
//   rating: number;
//   reviews: number;
//   category:
//     | {
//         _type: "reference";
//         _ref: string;
//         // This will be populated when using GROQ queries with dereferencing
//         name?: string; // Populated via projection
//         title?: string; // Populated via projection
//       }
//     | Category; // Can be either reference or expanded category
//   bookFile: {
//     _type: "file";
//     asset: {
//       _ref: string;
//       _type: "reference";
//     };
//     originalFilename?: string;
//     size?: number;
//   };
// }

export interface Category {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  description?: string;
}

export interface BookFile {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
    url?: string; // Populated in queries
    originalFilename?: string;
    size?: number;
    mimeType?: string;
    sha1hash?: string;
  };
}

export interface BookImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
    url?: string; // Populated in queries
    alt?: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
      lqip?: string; // Low-quality image placeholder
    };
  };
}

export interface Book {
  _id: string;
  _type: "book";
  slug: string;
  description?: string;
  details?: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  author: string;
  cover: BookImage;
  rating: number;
  reviews: number;
  category:
    | {
        _type: "reference";
        _ref: string;
        // Expanded fields (when using -> in GROQ)
        _id?: string;
        title?: string;
        slug?: {
          _type: "slug";
          current: string;
        };
        description?: string;
      }
    | Category; // Can be either reference or expanded document

  bookFile: BookFile;

  // Computed fields (from queries)
  coverUrl?: string; // Shorthand from "cover.asset->url"
  coverAlt?: string;
  bookFileUrl?: string;

  // For list views
  categoryTitle?: string; // From projections
  categorySlug?: string;
}

// Type for the booksByCategory query result
export interface BooksByCategoryResult {
  _id: string;
  title: string;
  books: Array<{
    _id: string;
    title: string;
    author: string;
    slug: string;
    details?: string;
    description?: string;
    rating: number;
    coverUrl?: string;
    bookFileUrl?: string;
  }>;
}

// Type for single book query
export interface BookDetail extends Omit<Book, "category"> {
  category: Category; // Always expanded in detail view
  similarBooks?: Array<{
    _id: string;
    title: string;
    coverUrl?: string;
  }>;
}

export interface SearchBooksParams {
  searchQuery: string;
  category?: string;
}

export interface BookCategory {
  _id: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
}

export interface BookFile {
  url: string;
  originalFilename?: string;
  size?: number;
}

export interface BookSearchResult {
  _id: string;
  slug: string;
  _createdAt: string;
  title: string;
  author: string;
  description?: string;
  details?: string;
  rating: number;
  reviews: number;
  coverUrl?: string;
  coverAlt?: string;
  category?: BookCategory;
  bookFile: BookFile;
}

export interface BookPdfUrlResult {
  url?: string;
}

export interface BorrowedBookDocument {
  _type: "borrowedBook";
  user: {
    _type: "reference";
    _ref: string;
  };
  book: {
    _type: "reference";
    _ref: string;
  };
  borrowedDate: string;
  dueDate: string;
  returned: boolean;
  _id: string;
}

export interface BookPdfUrlResponse {
  url?: string;
  originalFilename?: string;
}

// types/borrowedBook.ts
export interface SanityReference {
  _type: "reference";
  _ref: string;
}

export interface SanityUserReference {
  _type: "reference";
  _ref: string;
  // You can expand this if you need to include user details
}

export interface SanityBookReference {
  _type: "reference";
  _ref: string;
  // You can expand this if you need to include book details
}

export interface BorrowedBookDocument {
  _id: string;
  _type: "borrowedBook"; // Must match your schema name exactly
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  user: SanityUserReference;
  book: SanityBookReference;
  borrowedDate: string; // ISO date string
  dueDate: string; // ISO date string
  returned: boolean;
}

// For the findUserByAuthIdQuery
export interface SanityUserResponse {
  _id: string;
}

// For the checkExistingBorrowQuery
export type ExistingBorrowsCount = number;

// For createBorrowRecord response
export interface CreateBorrowResponse extends BorrowedBookDocument {
  // You can add any additional fields from the mutation response
}

export interface OverdueBook {
  _id: string;
  book: {
    title: string;
    slug: {
      current: string;
    };
  };
  borrowedDate: string;
  dueDate: string;
}
