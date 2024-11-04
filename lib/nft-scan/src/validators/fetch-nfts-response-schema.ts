import { baseResponseSchema } from '@echo/nft-scan/validators/base-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { prop } from 'ramda'
import { object, string } from 'zod'

export const fetchNftsResponseSchema = baseResponseSchema
  .extend({
    data: object({
      next: string().nullable().optional(),
      content: nftResponseSchema.array()
    })
  })
  .transform(prop('data'))
