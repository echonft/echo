import type { Collection } from '@echo/model/types/collection'
import { COLLECTION_MOCK_PX_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'

export function getCollectionMock(): Collection {
  return getCollectionMockById(COLLECTION_MOCK_PX_ID)
}
