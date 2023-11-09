import { collectionSwapsCountMock } from '@echo/firestore-mocks/collection-swaps-count/collection-swaps-count-mock'

export function getCollectionSwapsCountMockById(id: string) {
  return collectionSwapsCountMock[id]!
}
