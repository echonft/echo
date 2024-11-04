import { baseResponseSchema } from '@echo/nft-scan/validators/base-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { prop } from 'ramda'

export const fetchNftResponseSchema = baseResponseSchema
  .extend({
    data: nftResponseSchema.nullable().optional()
  })
  .transform(prop('data'))
