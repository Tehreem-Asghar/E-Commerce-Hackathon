import { defineField, defineType } from "sanity";

const clientSayes = defineType({
    name : "clientSayes",
    title : "Client Sayes",
    type : "document",
    fields : [ 
     
        defineField({
            name : "images",
            type : "array",
            title : "Images",
            of : [
                {
                    type : "image",
                }
            ],
            validation : (Rule) => Rule.required(),

        }),
        defineField (  {
            name : "heading1",
            type : "string",
            title : "Heading1",
            validation : (Rule) => Rule.required(),

        }),
        defineField (  {
            name : "heading2",
            type : "string",
            title : "Heading2",
            validation : (Rule) => Rule.required(),

        }),
        defineField({
            name : "description",
            type : "text",
            title : "Description",
            validation : (Rule) => Rule.required(),

        })
    ]
})


export default clientSayes