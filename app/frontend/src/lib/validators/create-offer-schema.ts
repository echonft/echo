import { nftIndexSchema } from '@echo/frontend/lib/validators/nft-index-schema'
import { now } from '@echo/utils/helpers/now'
import { number, object } from 'zod'

export const createOfferSchema = object({
  receiverItems: nftIndexSchema.array().min(1),
  senderItems: nftIndexSchema.array().min(1),
  expiresAt: number().gt(now())
})
