import { defineType , defineField } from "sanity";
 

const  shopexOffer = defineType({
    name : "shopexOffer",
    type : "document",
    title : "Shopex Offer!",
    fields :[

        defineField({
            name : "offertitle",
            type : "string",
            title : "Offer Title",
            validation: (Rule) => Rule.required(),
        }),
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
            name : "image",
            type : "image",
            title : "Image",
            validation: (Rule) => Rule.required(),
            
        })
    ]
})

export default shopexOffer