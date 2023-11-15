import { guarded_assertOfferReceiverIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-is'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'

describe('helpers - offer - assert - guarded_assertOfferReceiverIs', () => {
  it('throws if offer receiver does not have the passed username', () => {
    expect(() => guarded_assertOfferReceiverIs({ state: OFFER_STATE_OPEN } as Offer, 'username')).toThrow()
    expect(() => guarded_assertOfferReceiverIs({ sender: {} } as Offer, 'username')).toThrow()
    expect(() =>
      guarded_assertOfferReceiverIs({ receiver: { username: 'not-the-same' } } as Offer, 'username')
    ).toThrow()
  })

  it('does not throw if offer receiver has the passed username', () => {
    expect(() =>
      guarded_assertOfferReceiverIs({ receiver: { username: 'username' } } as Offer, 'username')
    ).not.toThrow()
  })
})
