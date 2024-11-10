import { slugSchema } from '@echo/model/validators/slug-schema'
import { object } from 'zod'

export const selectionSearchParamsSchema = object({
  offer: slugSchema
})
  .strict()
  .or(
    object({
      listing: slugSchema
    }).strict()
  )
  .or(
    object({
      swap: slugSchema
    }).strict()
  )
