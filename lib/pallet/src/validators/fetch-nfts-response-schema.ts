import { baseResponseSchema } from '@echo/pallet/validators/base-response-schema'
import { palletNftResponseSchema } from '@echo/pallet/validators/pallet-nft-response-schema'
import { prop } from 'ramda'
import { array } from 'zod'

export const fetchNftsResponseSchema = baseResponseSchema
  .extend({
    tokens: array(palletNftResponseSchema)
  })
  .transform(prop('tokens'))
