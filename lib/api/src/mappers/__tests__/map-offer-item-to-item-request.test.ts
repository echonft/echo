import { mapOfferItemToItemRequest } from '../map-offer-item-to-item-request'
import { mockOffer } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapOfferItemToItemRequest', () => {
  const mockOfferItem = mockOffer.senderItems[0]!
  it('proper offer item returns ItemRequest', () => {
    const result = mapOfferItemToItemRequest(mockOfferItem)
    expect(result.tokenId).toEqual(mockOfferItem.tokenId.toString())
    expect(result.target.address).toEqual(mockOfferItem.contract.address)
    expect(result.target.chainId).toEqual(mockOfferItem.contract.chainId)
  })
})
