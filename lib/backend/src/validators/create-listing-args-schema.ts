import { Expiration } from '@echo/model/constants/expiration'
import { listingSchema } from '@echo/model/validators/listing-schema'
import { nativeEnum } from 'zod'

export const createListingArgsSchema = listingSchema.pick({ items: true, target: true }).extend({
  expiration: nativeEnum(Expiration)
})
