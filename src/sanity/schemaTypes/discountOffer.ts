import { defineType , defineField } from "sanity";
 

const  DiscountOffer = defineType({
    name : "discountOffer",
    type : "document",
    title : "Discount Offer",
    fields :[
        defineField({
            name : "discount",
            type : "string",
            title : "Discount Offer",
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

export default DiscountOffer