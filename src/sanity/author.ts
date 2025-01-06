import { defineType, defineField } from "sanity";

 const author = defineType({
    name: "author",
    title: "Author",
    type: "document",
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Author Name',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Author Image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'profession',
            title: 'Profession',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'bio',
            type: 'text',
            title: 'Bio',
            validation: Rule => Rule.required()
        }),
        
    ],
});


export default author;