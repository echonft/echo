import { nftIndexSchema } from '@echo/frontend/lib/validators/nft-index-schema'
import { z } from 'zod'

export const createOfferSchema = z.object({
  receiverItems: nftIndexSchema.array().min(1),
  senderItems: nftIndexSchema.array().min(1),
  expiresAt: z.number().gt(0)
})
