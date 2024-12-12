import { collectionResponseSchema } from '@echo/pallet/validators/collection-response-schema'
import { isNil } from 'ramda'

export const fetchCollectionDetailsResponseSchema = collectionResponseSchema.transform((response) => {
  if (isNil(response.collection)) {
    return { collection: undefined, isSpam: false }
  }
  return { collection: response.collection, isSpam: false }
})
