import type { Offer } from '@echo/model/types/offer'
import { assertOfferReceiverIs } from '@server/helpers/offer/assert-offer-receiver-is'

describe('helpers - offer - assertOfferReceiverIs', () => {
  it('throws if offer receiver does not have the passed username', () => {
    expect(() => assertOfferReceiverIs({ state: 'OPEN' } as Offer, 'username')).toThrow()
    expect(() => assertOfferReceiverIs({ sender: {} } as Offer, 'username')).toThrow()
    expect(() => assertOfferReceiverIs({ receiver: { username: 'not-the-same' } } as Offer, 'username')).toThrow()
  })

  it('does not throw if offer receiver has the passed username', () => {
    expect(() => assertOfferReceiverIs({ receiver: { username: 'username' } } as Offer, 'username')).not.toThrow()
  })
})
