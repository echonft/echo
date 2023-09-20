import { nftMock } from '@echo/firestore-mocks/nft-mock'

export function getNftMockById(id: string) {
  return nftMock[id]!
}
