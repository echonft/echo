import { type Offer } from '@echo/model/types/offer'
import { assertOfferSenderIs } from '@server/helpers/offer/assert/assert-offer-sender-is'

describe('helpers - offer - assert - assertOfferSenderIs', () => {
  it('throws if offer sender does not have the passed username', () => {
    expect(() => assertOfferSenderIs({ state: 'OPEN' } as Offer, 'username')).toThrow()
    expect(() => assertOfferSenderIs({ sender: {} } as Offer, 'username')).toThrow()
    expect(() => assertOfferSenderIs({ sender: { username: 'not-the-same' } } as Offer, 'username')).toThrow()
  })

  it('does not throw if offer sender has the passed username', () => {
    expect(() => assertOfferSenderIs({ sender: { username: 'username' } } as Offer, 'username')).not.toThrow()
  })
})
