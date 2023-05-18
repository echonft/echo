import { ItemRequest } from '../../types/model/requests/item-request'
import { mapItemOfferItemPrototype } from '../map-item-offer-item-prototype'
import { describe, expect, it } from '@jest/globals'

describe('mapItemRequestToRequestForOfferItemPrototype', () => {
  it('should return the expected request prototype when given a valid item request (no balance)', () => {
    const validItemRequest = {
      tokenId: '1',
      target: { address: 'test', chainId: 0 }
    } as ItemRequest

    const result = mapItemOfferItemPrototype(validItemRequest)
    expect(result.tokenId.toString()).toEqual(validItemRequest.tokenId.toString())
    expect(result.balance).toBeUndefined()
    expect(result.contract.chainId).toBe(0)
    expect(result.contract.address).toBe('test')
  })
})
