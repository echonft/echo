import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'

export function getNftMock() {
  return getNftMockById(nftMockSpiralJohnnyId())
}
