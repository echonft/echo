import { nftMock } from '@echo/model-mocks/nft/nft-mock'

export function getNftMockById(id: string) {
  return nftMock[id]!
}
