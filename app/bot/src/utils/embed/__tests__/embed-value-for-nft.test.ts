import { embedValueForNft } from '../embed-value-for-nft'
import { nfts } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

// FIXME
describe('utils - embed - embedValueForNft', () => {
  const mockNft = nfts['QFjMRNChUAHNswkRADXh']!
  it('should return expected result with name and tokenId', () => {
    const expectedResult = 'pxMythics Genesis Creative Demigod #024'
    const result = embedValueForNft(mockNft)
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result with only tokenId and no name', () => {
    const expectedResult = 'TEST #123'
    const result = embedValueForNft(mockNft)
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result with only tokenId and no symbol or name', () => {
    const expectedResult = ' #123'
    const result = embedValueForNft(mockNft)
    expect(result).toEqual(expectedResult)
  })

  it('should throw an error when no token ID is provided', () => {
    expect(() => {
      embedValueForNft(mockNft)
    }).toThrow()
  })
})
