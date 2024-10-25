import { TokenType } from '@echo/model/constants/token-type'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { literal, number, object } from 'zod'

export const erc721ItemRequestSchema = object({
  token: object({
    collection: withSlugSchema,
    tokenId: number().int().positive().readonly(),
    type: literal(TokenType.Erc721).readonly()
  })
}).readonly()
