import { defineType , defineField } from "sanity";
 

const  trendingProduct = defineType({
    name : "trendingproduct",
    type : "document",
    title : "Trending Product",
    fields :[
        defineField({
            name : "title",
            type : "string",
            title : "Title",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name : "description",
            type : "string",
            title : "Description",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name : "newPrice",
            type : "number",
            title : "New Price",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name : "oldPrice",
            type : "number",
            title : "old Price",
            validation: (Rule) => Rule.required(),
        }),
        
        defineField({
            name : "image",
            type : "image",
            title : "Image",
            validation: (Rule) => Rule.required(),
            
        }) ,
        defineField({
            name: "stock",
            type: "number",
            title: "inventory/Stock",
            validation: (Rule) => Rule.required(),
          }),


    ]
})

export default trendingProduct