import { itemsSchema } from '@echo/api/validators/items-schema'
import { Expiration } from '@echo/model/constants/expiration'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { nativeEnum, number, object } from 'zod'

const listingTargetSchema = object({
  collection: withSlugSchema,
  quantity: number().int().positive()
})

export const createListingRequestSchema = object({
  items: itemsSchema,
  target: listingTargetSchema,
  expiration: nativeEnum(Expiration)
})
