import { toSlug } from '@echo/model/helpers/to-slug'
import { object, string } from 'zod'

export const slugSchema = string().min(1).transform(toSlug)

export const withSlugSchema = object({
  slug: slugSchema
})
