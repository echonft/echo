import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import type { CollectionWithCounts } from '@echo/model/types/collection/collection-with-counts'
import { assoc, pipe } from 'ramda'

export function getCollectionWithCountsMock(): CollectionWithCounts {
  return pipe(
    getCollectionMockById,
    assoc('listingsCount', 57),
    assoc('swapsCount', 35),
    assoc('nftsCount', 220),
    assoc('offersCount', 108)
  )(collectionMockSpiralId())
}
