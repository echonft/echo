import { type Collection } from '@echo/model/types/collection'
import { collectionMock } from '@echo/model-mocks/collection/collection-mock'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllCollectionMocks() {
  return Object.values(collectionMock()) as NonEmptyArray<Collection>
}
