// schemas/borrowedBooks.ts
import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const borrowedBookType = defineType({
  name: "borrowedBook",
  title: "Borrowed Book",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }], 
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "book",
      title: "Book",
      type: "reference",
      to: [{ type: "book" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "borrowedDate",
      title: "Borrowed Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dueDate",
      title: "Due Date",
      type: "datetime",
      initialValue: () => {
        const date = new Date();
        date.setDate(date.getDate() + 14); // 2 weeks from now
        return date.toISOString();
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "returned",
      title: "Returned?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "book.title",
      user: "user.name",
      date: "borrowedDate",
    },
    prepare(selection) {
      const { title, user, date } = selection;
      return {
        title: title,
        subtitle: `Borrowed by ${user} on ${new Date(date).toLocaleDateString()}`,
      };
    },
  },
});
