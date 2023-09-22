import { nftCollectionMock } from '@echo/firestore-mocks/nft-collection/nft-collection-mock'

export function getNftCollectionMockById(id: string) {
  return nftCollectionMock[id]!
}
