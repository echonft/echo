import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { object } from 'zod'

export const getCollectionResponseSchema = object({
  data: collectionResponseSchema
}).extend(baseResponseAugmentation)
