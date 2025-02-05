import { defineField, defineType } from "sanity";

const herosec = defineType({
    name: "herosection",
    type: "document",
    title: "Hero Section",
    fields: [
        defineField({
            name: "toptitle",
            type: "string",
            title: "Top Heading",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "secondtitle",
            type: "string",
            title: "Second Heading",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            type: "string",
            title: "Description",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "buttonText",
            type: "string",
            title: "Button Text",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "buttonLink",
            type: "url",
            title: "Button Link",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "imageOne",
            type: "image",
            title: "Image One",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "imageTwo",
            type: "image",
            title: "Image Two",
            validation: (Rule) => Rule.required(),
        }),
    ],
});

export default herosec;

