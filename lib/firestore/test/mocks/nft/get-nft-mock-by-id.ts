import { nftMock } from '@echo/firestore-mocks/nft/nft-mock'

export function getNftMockById(id: string) {
  return nftMock[id]!
}
