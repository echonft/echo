import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { object } from 'zod'

export const getNftResponseSchema = object({
  data: nftResponseSchema
}).extend(baseResponseAugmentation)
