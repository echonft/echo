import { stringForListingItems } from '../string-for-listing-items'
import { OfferItem } from '@echo/model'
import { describe, expect, test } from '@jest/globals'

describe('string-for-listing-items - stringForListingItems', () => {
  const anyNFT = 'Any NFT'
  test('Undefined OfferItem returns Any NFT', () => {
    expect(stringForListingItems(undefined)).toEqual(anyNFT)
  })
  test('Empty OfferItem returns Any NFT', () => {
    expect(stringForListingItems([])).toEqual(anyNFT)
  })
  test('Single OfferItem returns contract address with token id', () => {
    const offerItem = { tokenId: 1234, contract: { address: '0x123456789' } } as unknown as OfferItem
    expect(stringForListingItems([offerItem])).toEqual('0x123456789:1234')
  })
  test('Multiple OfferItem returns contract address with token id separated by a comma', () => {
    const offerItem1 = { tokenId: 1234, contract: { address: '0x123456789' } } as unknown as OfferItem
    const offerItem2 = { tokenId: 12345, contract: { address: '0x1234567890' } } as unknown as OfferItem

    expect(stringForListingItems([offerItem1, offerItem2])).toEqual('0x123456789:1234,0x1234567890:12345')
  })
})
