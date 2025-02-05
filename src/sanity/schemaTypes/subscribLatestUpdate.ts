import { defineField, defineType } from 'sanity';

const subscrib =  defineType({
    name: 'subscribeLatestUpdate',
    title: 'Subscribe Latest Update',
    type: 'document',
    fields: [
        defineField({
            name: 'subscribtext',
            title: 'SubscribeText',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'buttontext',
            title: 'button Text',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'buttonUrl',
            title: 'button Url',
            type: 'url',
            validation: Rule => Rule.required()
        })
    ]
});


export default  subscrib