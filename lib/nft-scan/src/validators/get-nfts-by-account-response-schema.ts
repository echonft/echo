import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { number, object, string } from 'zod'

export const getNftsByAccountResponseSchema = object({
  data: object({
    total: number(),
    next: string().nullable(),
    content: nftResponseSchema.array()
  })
}).extend(baseResponseAugmentation)
