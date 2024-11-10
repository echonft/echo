import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { object } from 'zod'

export const selectionQueryParamsSchema = object({
  offer: withSlugSchema
})
  .strict()
  .or(
    object({
      listing: withSlugSchema
    }).strict()
  )
  .or(object({ swap: withSlugSchema }).strict())
