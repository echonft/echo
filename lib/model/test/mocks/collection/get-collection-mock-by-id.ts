import { collectionMock } from '@echo/model-mocks/collection/collection-mock'

export function getCollectionMockById(id: string) {
  return collectionMock[id]!
}
