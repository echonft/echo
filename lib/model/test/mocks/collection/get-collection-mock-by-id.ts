import type { Collection } from '@echo/model/types/collection'
import { collectionMock } from '@echo/model-mocks/collection/collection-mock'

export function getCollectionMockById(id: string): Collection {
  return collectionMock[id]!
}
