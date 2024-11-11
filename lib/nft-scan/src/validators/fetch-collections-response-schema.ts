import { baseResponseSchema } from '@echo/nft-scan/validators/base-response-schema'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { prop } from 'ramda'
import { object, string } from 'zod'

export const fetchCollectionsResponseSchema = baseResponseSchema
  .extend({
    data: object({
      next: string().nullable().optional(),
      content: collectionResponseSchema.array()
    })
  })
  .transform(prop('data'))
