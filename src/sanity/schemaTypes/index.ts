import { type SchemaTypeDefinition } from 'sanity'
import author from '../author'
import category from '../category'
import blog from '../blog'
import comment from '../comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, category, blog, comment],
}
