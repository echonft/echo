import { slugSchema } from '@echo/utils/validators/slug-schema'
import { number, object } from 'zod'

export const listingTargetSchema = object({
  amount: number().gt(0),
  collection: slugSchema
})
