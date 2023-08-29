import { z } from 'zod'

export const nftCollectionRequestSchema = z.object({
  slug: z.string().array().min(1).max(2)
})
