import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { collectionSwapsCountMock } from '@echo/firestore-mocks/collection-swaps-count/collection-swaps-count-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllCollectionSwapsCountMocks() {
  return Object.values(collectionSwapsCountMock) as NonEmptyArray<CollectionSwapsCount>
}
