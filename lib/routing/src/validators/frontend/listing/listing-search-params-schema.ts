import { slugSchema } from '@echo/model/validators/slug-schema'
import { object, string } from 'zod'

export const listingSearchParamsSchema = object({
  items: string().min(1).array().nonempty()
})
  .strict()
  .or(
    object({
      target: slugSchema
    }).strict()
  )
