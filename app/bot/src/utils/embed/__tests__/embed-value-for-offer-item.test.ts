import { embedValueForOfferItem } from '../embed-value-for-offer-item'
import { OfferItem } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('utils - embed - embedValueForOfferItem', () => {
  it('should return expected result with name and tokenId', () => {
    const item = {
      tokenId: 123,
      contract: {
        name: 'Test Token',
        symbol: 'TEST'
      }
    } as unknown as OfferItem
    const expectedResult = 'Test Token #123'
    const result = embedValueForOfferItem(item)
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result with only tokenId and no name', () => {
    const item = {
      tokenId: 123,
      contract: {
        symbol: 'TEST'
      }
    } as unknown as OfferItem
    const expectedResult = 'TEST #123'
    const result = embedValueForOfferItem(item)
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result with only tokenId and no symbol or name', () => {
    const item = {
      tokenId: 123,
      contract: {}
    } as unknown as OfferItem
    const expectedResult = ' #123'
    const result = embedValueForOfferItem(item)
    expect(result).toEqual(expectedResult)
  })

  it('should throw an error when no token ID is provided', () => {
    const item = {
      tokenId: undefined,
      contract: {
        name: 'Test Token',
        symbol: 'TEST'
      }
    } as unknown as OfferItem

    expect(() => {
      embedValueForOfferItem(item)
    }).toThrow()
  })
})
