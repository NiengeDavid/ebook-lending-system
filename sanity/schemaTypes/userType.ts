// schemas/user.ts
import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "firstname",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastname",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) => Rule.email().required(),
        }),
      ],
    }),

    defineField({
      name: "academic",
      title: "Academic Information",
      type: "object",
      hidden: ({ document }) => document?.role === "superAdmin",
      fields: [
        defineField({
          name: "regNumber",
          title: "Registration Number",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "authStatus",
      title: "Authentication Status",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Verified", value: "verified" },
          { title: "Pending", value: "pending" },
        ],
      },
      initialValue: "pending",
    }),

    // defineField({
    //   name: "bio",
    //   title: "Biography",
    //   type: "array",
    //   hidden: ({ document }) => document?.role === "student",
    //   of: [
    //     defineArrayMember({
    //       type: "block",
    //       styles: [{ title: "Normal", value: "normal" }],
    //       lists: [],
    //       marks: {
    //         decorators: [
    //           { title: "Strong", value: "strong" },
    //           { title: "Emphasis", value: "em" },
    //         ],
    //       },
    //     }),
    //   ],
    // }),
  ],
});
