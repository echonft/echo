import { slugSchema } from '@echo/utils/validators/slug-schema'
import { z } from 'zod'

export const nftIndexSchema = z.object({
  collection: slugSchema,
  tokenId: z.number().gte(0)
})
