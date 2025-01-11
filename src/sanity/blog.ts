import { defineType, defineField, defineArrayMember } from "sanity";


const blog  = defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'Title',
        description: "Blog Title",
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Click Generate to create auto',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'author',
        type: 'reference',
        description: 'Select the Author or create a new one',
        to: [{ type: 'author' }],
        title: 'Author',
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'publishedAt',
        type: 'datetime',
        title: 'Published At',
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'categories',
        type: 'array',
        title: 'Categories',
        description: 'Select the Blog Category',
        of: [{ type: 'reference', to: [{ type: 'category' }] }],
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'mainImage',
        type: 'image',
        title: 'Main Image',
        description: 'main image of your Blog.',
        options: {
          hotspot: true, // Allows focal point selection
        },
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'excerpt',
        type: 'text',
        title: 'Excerpt',
        description: 'Short summary of the post.',
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'content',
        type: 'array',
        title: 'Content',
        description: "Fully Content of your Blog.",
        of: [
            defineArrayMember({ type: 'block' }), 
            defineArrayMember({ type: 'image' })
        ],
        validation: Rule => Rule.required()    
      }),
    ],
  });
  

export default blog;