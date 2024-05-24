import { getAllCollectionSwapsCountMocks } from '@echo/firestore-mocks/collection-swaps-count/get-all-collection-swaps-count-mocks'
import { find, isNil, propEq } from 'ramda'

export function getCollectionSwapsCountMockByCollectionId(collectionId: string) {
  const mock = find(propEq(collectionId, 'collectionId'), getAllCollectionSwapsCountMocks())
  if (isNil(mock)) {
    throw Error(`wrong CollectionSwapsCount mock collectionId: ${collectionId}`)
  }
  return mock
}
