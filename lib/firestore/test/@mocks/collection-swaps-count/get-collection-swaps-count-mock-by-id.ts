import { collectionSwapsCountMock } from '@echo/firestore-mocks/collection-swaps-count/collection-swaps-count-mock'
import { isNil } from 'ramda'

export function getCollectionSwapsCountMockById(id: string) {
  const mock = collectionSwapsCountMock[id]
  if (isNil(mock)) {
    throw Error(`wrong CollectionSwapsCount mock id: ${id}`)
  }
  return mock
}
