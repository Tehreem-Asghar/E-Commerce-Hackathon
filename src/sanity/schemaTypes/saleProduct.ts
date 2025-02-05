import { defineField, defineType } from "sanity";

const saleProduct = defineType({
  name: "saleProduct",
  type: "document",
  title: "Sale Product",
  fields: [
    defineField({
      name: "blogtitle",
      type: "string",
      title: "Blog Title",
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      validation : (Rule) => Rule.required(),
      options: {
        source: "blogtitle", 
        maxLength: 200, 
      },
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Blog Description",
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name: "blogimage",
      type: "image",
      title: "Blog Image",
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name: "blogpoint",
      type: "array",
      title: "Blog Points",
      validation : (Rule) => Rule.required(),
      of: [
        defineField({
          name: "point",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Point Title",
              validation : (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              type: "string",
              title: "Point Description",
              validation : (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    defineField({
        name: "publishDate",
        type: "datetime",
        title: "Publish Date",
        description: "Select the publication date of the blog",
        validation : (Rule) => Rule.required(),
      }),
  ],
});

export default saleProduct;


