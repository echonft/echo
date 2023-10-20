import { assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer'
import { type Offer } from '@echo/model/types/offer'

describe('helpers - offer - assert - assertOffer', () => {
  it('throws if offer is undefined', () => {
    expect(() => assertOffer(undefined)).toThrow()
  })
  it('does not throw if offer is defined', () => {
    expect(() => assertOffer({ id: 'offerId' } as Offer)).not.toThrow()
  })
})
