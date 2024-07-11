import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nft } from '@echo/model/types/nft'

export function getNftMock(): Nft {
  return getNftMockById(nftMockSpiralJohnnyId())
}
