import { erc1155ItemRequestSchema } from '@echo/api/validators/erc1155-item-request-schema'
import { erc721ItemRequestSchema } from '@echo/api/validators/erc721-item-request-schema'
import { Expiration } from '@echo/model/constants/expiration'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { nativeEnum, number, object } from 'zod'

export const createListingRequestSchema = object({
  expiration: nativeEnum(Expiration),
  items: erc721ItemRequestSchema.or(erc1155ItemRequestSchema).array().nonempty(),
  target: object({
    collection: withSlugSchema,
    quantity: number().int().positive()
  })
})
