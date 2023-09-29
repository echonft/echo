import { getAllNftCollectionSwapsCountMocks } from '@echo/firestore-mocks/nft-collection-swaps-count/get-all-nft-collection-swaps-count-mocks'
import { find, propEq } from 'ramda'

export function getNftCollectionSwapsCountMockByCollectionId(collectionId: string) {
  const mocks = getAllNftCollectionSwapsCountMocks()
  return find(propEq(collectionId, 'collectionId'), mocks)!
}
