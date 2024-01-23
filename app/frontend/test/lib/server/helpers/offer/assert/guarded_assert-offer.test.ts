import { guarded_assertOffer } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer'
import { type Offer } from '@echo/model/types/offer'

describe('helpers - offer - assert - guarded_assertOffer', () => {
  it('throws if offer is undefined', () => {
    expect(() => guarded_assertOffer(undefined)).toThrow()
  })
  it('does not throw if offer is defined', () => {
    expect(() => guarded_assertOffer({ id: 'offerId' } as Offer)).not.toThrow()
  })
})
