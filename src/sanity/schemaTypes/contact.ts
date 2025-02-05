import { defineField, defineType } from "sanity";

const contact = defineType({
    name : "contact",
    type : "document",
    title : "Contact",
    fields : [ 
        defineField({
            name : "infotitle",
            type : "string",
            title : " Title Information About",
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : "infdescription",
            type : "string",
            title : "description About informaion",
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : "titlegetintouch",
            type : "string",
            title : "Get In Touch Title",
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : "descriptiongetintouch",
            type : "string",
            title : "Description Get In Touch Title",
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : "titleContactWay",
            type : "string",
            title : "Contact Way Title",
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : "ContactWayopt1",
            type : "string",
            title : "Option 1 Contact Way",
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : "ContactWayopt2",
            type : "string",
            title : "Option 2 Contact Way",
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : "ContactWayopt3",
            type : "string",
            title : "Option 3 Contact Way",
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : "ContactWayopt4",
            type : "string",
            title : "Option 4 Contact Way",
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : "image",
            type : "image",
            title : "Image Contact Way",
            validation : (Rule) => Rule.required(),
        }),
    ]
})

export default contact