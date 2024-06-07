import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'

describe('helpers - offer - assert - assertOffer', () => {
  it('throws if offer is undefined', () => {
    expect(() => {
      assertOffer(undefined)
    }).toThrow()
  })
  it('does not throw if offer is defined', () => {
    expect(() => {
      assertOffer(getOfferMockById(offerMockToJohnnycageId()))
    }).not.toThrow()
  })
})
