import { nftResponseSchema } from '@echo/opensea/validators/nft-response-schema'
import { object, string } from 'zod'

export const fetchNftsResponseSchema = object({
  nfts: nftResponseSchema.array().readonly(),
  next: string().optional().readonly()
}).readonly()
