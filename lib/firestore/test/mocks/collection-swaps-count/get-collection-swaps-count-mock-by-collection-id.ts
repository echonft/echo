import { getAllCollectionSwapsCountMocks } from '@echo/firestore-mocks/collection-swaps-count/get-all-collection-swaps-count-mocks'
import { find, propEq } from 'ramda'

export function getCollectionSwapsCountMockByCollectionId(collectionId: string) {
  const mocks = getAllCollectionSwapsCountMocks()
  return find(propEq(collectionId, 'collectionId'), mocks)!
}
