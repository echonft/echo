import { baseResponseSchema } from '@echo/nft-scan/validators/base-response-schema'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { prop } from 'ramda'

export const fetchCollectionsResponseSchema = baseResponseSchema
  .extend({
    data: collectionResponseSchema.array()
  })
  .transform(prop('data'))
