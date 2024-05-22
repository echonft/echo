import { collectionSchema } from '@echo/frontend/lib/validators/collection-schema'
import { z } from 'zod'

export const nftIndexSchema = z.object({
  collection: collectionSchema,
  tokenId: z.number().gt(0)
})
