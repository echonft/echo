import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('utils - embed - embedValueForNft', () => {
  it('should return expected result', () => {
    const expectedResult = 'Spiral Frequencies #1376'
    const result = embedValueForNft(getNftMockById('8hHFadIrrooORfTOLkBg'))
    expect(result).toEqual(expectedResult)
  })
})
