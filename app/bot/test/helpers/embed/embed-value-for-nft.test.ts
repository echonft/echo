import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import { describe, expect, it } from '@jest/globals'

describe('helpers - embed - embedValueForNft', () => {
  it('should return expected result', () => {
    const expectedResult = 'Spiral Frequencies #1'
    const result = embedValueForNft(nftMockSpiral1)
    expect(result).toEqual(expectedResult)
  })
})
