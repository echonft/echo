import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import type { Collection } from '@echo/model/types/collection'

export function getCollectionMock(): Collection {
  return getCollectionMockById(collectionMockSpiralId())
}
