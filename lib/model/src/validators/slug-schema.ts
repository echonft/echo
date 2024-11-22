import { as } from '@echo/utils/helpers/as'
import { object, string } from 'zod'

export const slugSchema = string()
  .regex(/^[a-z0-9-_]+$/)
  .transform(as<Lowercase<string>>)

export const withSlugSchema = object({
  slug: slugSchema
})
