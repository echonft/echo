/* eslint-disable @typescript-eslint/ban-ts-comment */
import { embedValueForNft } from '../embed-value-for-nft'
import { nfts } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('utils - embed - embedValueForNft', () => {
  const nft = nfts['QFjMRNChUAHNswkRADXh']!
  it('should return expected result with name and tokenId', () => {
    const expectedResult = 'pxMythics Genesis Creative Demigod #024'
    const result = embedValueForNft(nft)
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result with only tokenId and no name', () => {
    const mockNft = { ...nft, name: undefined }
    const expectedResult = 'pxMythics Genesis #17'
    const result = embedValueForNft(mockNft)
    expect(result).toEqual(expectedResult)
  })
})
