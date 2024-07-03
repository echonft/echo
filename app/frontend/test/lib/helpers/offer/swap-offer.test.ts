import { swapOffer } from '@echo/frontend/lib/helpers/offer/swap-offer'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Nft } from '@echo/model/types/nft'
import { always, map, modify } from 'ramda'

describe('helpers - offer - swapOffer', () => {
  const mockOffer = getOfferMockById(offerMockToJohnnycageId())

  it('should swap owners of sender and receiver items', () => {
    const result = swapOffer(mockOffer)
    expect(result.senderItems).toEqual(
      map<Nft, Nft>(modify('owner', always(mockOffer.receiver)))(mockOffer.senderItems)
    )
    expect(result.receiverItems).toEqual(
      map<Nft, Nft>(modify('owner', always(mockOffer.sender)))(mockOffer.receiverItems)
    )
  })
})
