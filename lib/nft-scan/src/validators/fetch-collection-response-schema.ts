import { baseResponseSchema } from '@echo/nft-scan/validators/base-response-schema'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { isNil } from 'ramda'

export const fetchCollectionResponseSchema = baseResponseSchema
  .extend({
    data: collectionResponseSchema.nullable().optional()
  })
  .transform((response) => {
    const { data } = response
    if (isNil(data)) {
      return { collection: undefined, isSpam: false }
    }
    return data
  })
