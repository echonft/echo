import { baseResponseSchema } from '@echo/pallet/validators/base-response-schema'
import { nftResponseSchema } from '@echo/pallet/validators/nft-response-schema'
import { pipe, prop } from 'ramda'
import { array } from 'zod'

export const fetchNftsByAccountResponseSchema = baseResponseSchema
  .extend({
    tokens: array(nftResponseSchema)
  })
  .transform(
    pipe(
      prop('tokens'),
      array.transform((tokens) => tokens.map(prop('nft')))
    )
  )
