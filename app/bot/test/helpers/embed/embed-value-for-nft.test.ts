import { embedValueForNft } from '../../../src/helpers/embed/embed-value-for-nft'
import { nftMock } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('utils - embed - embedValueForNft', () => {
  it('should return expected result', () => {
    const expectedResult = 'Spiral Frequencies #1376'
    const result = embedValueForNft(nftMock['8hHFadIrrooORfTOLkBg']!)
    expect(result).toEqual(expectedResult)
  })
})
