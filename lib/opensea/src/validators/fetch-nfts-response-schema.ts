import { nftResponseSchema } from '@echo/opensea/validators/nft-response-schema'
import { object, string } from 'zod'

export const fetchNftsResponseSchema = object({
  nfts: nftResponseSchema.array(),
  next: string().optional()
})
