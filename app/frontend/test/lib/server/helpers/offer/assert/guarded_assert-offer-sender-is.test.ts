import { guarded_assertOfferSenderIs } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer-sender-is'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'

describe('helpers - offer - assert - guarded_assertOfferSenderIs', () => {
  it('throws if offer sender does not have the passed username', () => {
    expect(() => guarded_assertOfferSenderIs({ state: OFFER_STATE_OPEN } as Offer, 'username')).toThrow()
    expect(() => guarded_assertOfferSenderIs({ sender: {} } as Offer, 'username')).toThrow()
    expect(() => guarded_assertOfferSenderIs({ sender: { username: 'not-the-same' } } as Offer, 'username')).toThrow()
  })

  it('does not throw if offer sender has the passed username', () => {
    expect(() => guarded_assertOfferSenderIs({ sender: { username: 'username' } } as Offer, 'username')).not.toThrow()
  })
})
