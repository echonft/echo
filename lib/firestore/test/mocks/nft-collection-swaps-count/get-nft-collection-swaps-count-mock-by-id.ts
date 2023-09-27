import { nftCollectionSwapsCountMock } from '@echo/firestore-mocks/nft-collection-swaps-count/nft-collection-swaps-count-mock'

export function getNftCollectionSwapsCountMockById(id: string) {
  return nftCollectionSwapsCountMock[id]!
}
