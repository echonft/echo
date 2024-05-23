import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NFT_MOCK_SPIRAL_JOHNNY_ID } from '@echo/model-mocks/nft/nft-mock'
import { describe, expect, it } from '@jest/globals'

describe('helpers - embed - embedValueForNft', () => {
  it('should return expected result', () => {
    const expectedResult = 'Spiral Frequencies #1376'
    const result = embedValueForNft(getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID))
    expect(result).toEqual(expectedResult)
  })
})
