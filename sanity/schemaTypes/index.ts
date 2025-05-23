import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { bookType } from "./bookType";
import { borrowedBookType } from "./borrowedBooksType";
import { userType } from "./userType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    bookType,
    borrowedBookType,
    userType,
  ],
};
