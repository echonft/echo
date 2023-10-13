import { collectionMock } from '@echo/firestore-mocks/collection/collection-mock'
import type { Collection } from '@echo/model/types/collection'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllCollectionMocks() {
  return Object.values(collectionMock) as NonEmptyArray<Collection>
}
