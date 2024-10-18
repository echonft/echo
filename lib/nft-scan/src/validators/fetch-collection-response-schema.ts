import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import {
  collectionResponseSchema,
  type CollectionResponseSchemaReturn
} from '@echo/nft-scan/validators/collection-response-schema'
import type { Chain } from '@echo/utils/constants/chain'
import { isNil } from 'ramda'
import { object } from 'zod'

export function fetchCollectionResponseSchema(chain: Chain) {
  return object({
    data: collectionResponseSchema(chain).nullable().optional()
  })
    .extend(baseResponseAugmentation)
    .transform<CollectionResponseSchemaReturn>((response) => {
      const { data } = response
      if (isNil(data)) {
        return { collection: undefined, isSpam: false }
      }
      return data
    })
}
