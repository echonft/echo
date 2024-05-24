import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NFT_MOCK_SPIRAL_JOHNNY_ID } from '@echo/model-mocks/nft/nft-mock'

export function getNftMock() {
  return getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID)
}
