import { TokenType } from '@echo/model/constants/token-type'
import { quantitySchema } from '@echo/model/validators/quantity-schema'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { literal, number, object } from 'zod'

export const erc1155ItemRequestSchema = object({
  token: object({
    collection: withSlugSchema,
    tokenId: number().int().positive(),
    type: literal(TokenType.Erc1155)
  }),
  quantity: quantitySchema
})
