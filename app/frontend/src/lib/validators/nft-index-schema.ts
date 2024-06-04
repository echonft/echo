import { slugSchema } from '@echo/utils/validators/slug-schema'
import { number, object } from 'zod'

export const nftIndexSchema = object({
  collection: slugSchema,
  tokenId: number().gte(0)
})
