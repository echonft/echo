import { baseResponseSchema } from '@echo/pallet/validators/base-response-schema'
import { extendedNftResponseSchema } from '@echo/pallet/validators/nft-response-schema'
import { pipe, prop } from 'ramda'
import { array } from 'zod'

export const fetchNftsByCollectionResponseSchema = baseResponseSchema
  .extend({
    tokens: array(extendedNftResponseSchema)
  })
  .transform(
    pipe(
      prop('tokens'),
      array.transform((tokens) => tokens.map(prop('nft')))
    )
  )
