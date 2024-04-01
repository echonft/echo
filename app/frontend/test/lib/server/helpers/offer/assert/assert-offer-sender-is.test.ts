import { assertOfferSenderIs } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-sender-is'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'

describe('helpers - offer - assert - assertOfferSenderIs', () => {
  it('throws if offer sender does not have the passed username', () => {
    expect(() => assertOfferSenderIs({ state: OFFER_STATE_OPEN } as Offer, 'username')).toThrow()
    expect(() => assertOfferSenderIs({ sender: {} } as Offer, 'username')).toThrow()
    expect(() => assertOfferSenderIs({ sender: { username: 'not-the-same' } } as Offer, 'username')).toThrow()
  })

  it('does not throw if offer sender has the passed username', () => {
    expect(() => assertOfferSenderIs({ sender: { username: 'username' } } as Offer, 'username')).not.toThrow()
  })
})
