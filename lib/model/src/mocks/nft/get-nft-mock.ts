import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'

export function getNftMock(): OwnedNft {
  return getNftMockById(nftMockSpiralJohnnyId())
}
