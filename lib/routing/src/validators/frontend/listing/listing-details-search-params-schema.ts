import { serializeListingSchema } from '@echo/model/validators/listing-schema'
import { object } from 'zod'

export const listingDetailsSearchParamsSchema = object({
  listing: serializeListingSchema
}).strict()
