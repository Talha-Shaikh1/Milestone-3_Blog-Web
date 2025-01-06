import { defineType, defineField } from "sanity";

const category = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        type: 'string',
        title: 'Name',
        validation: Rule => Rule.required()
      }),
      defineField({
        name: "slug",
        type: "slug",
        title: "Slug",
        options: {
          source: "name",
          maxLength: 96,
        },
        validation: Rule => Rule.required(),
      }),
    ],
  });
  

  export default category;