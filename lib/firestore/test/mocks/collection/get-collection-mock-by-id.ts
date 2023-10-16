import { collectionMock } from '@echo/firestore-mocks/collection/collection-mock'

export function getCollectionMockById(id: string) {
  return collectionMock[id]!
}
