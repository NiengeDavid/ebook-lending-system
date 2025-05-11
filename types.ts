export interface IMenuItem {
  text: string;
  url: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  reviews: number;
  category: "Science" | "Technology" | "Arts" | "Research";
}
