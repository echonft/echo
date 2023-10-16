import type { Offer } from '@echo/model/types/offer'
import { assertOfferState } from '@server/helpers/offer/assert-offer-state'

describe('helpers - offer - assertOfferState', () => {
  const offer = { state: 'OPEN' } as Offer
  it('throws if offer state is not in the passed states', () => {
    expect(() => assertOfferState(offer, 'ACCEPTED', 'CANCELLED', 'INVALID')).toThrow()
  })
  it('does not throw if offer state is in the passed states', () => {
    expect(() => assertOfferState(offer, 'OPEN', 'ACCEPTED')).not.toThrow()
  })
})
