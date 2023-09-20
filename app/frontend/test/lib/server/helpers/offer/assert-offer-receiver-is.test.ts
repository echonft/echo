import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { assertOfferReceiverIs } from '@server/helpers/offer/assert-offer-receiver-is'

describe('helpers - offer - assertOfferReceiverIs', () => {
  it('throws if offer receiver does not have the passed username', () => {
    expect(() => assertOfferReceiverIs({ state: 'OPEN' } as FirestoreOffer, 'username')).toThrow()
    expect(() => assertOfferReceiverIs({ sender: {} } as FirestoreOffer, 'username')).toThrow()
    expect(() =>
      assertOfferReceiverIs({ receiver: { username: 'not-the-same' } } as FirestoreOffer, 'username')
    ).toThrow()
  })

  it('does not throw if offer receiver has the passed username', () => {
    expect(() =>
      assertOfferReceiverIs({ receiver: { username: 'username' } } as FirestoreOffer, 'username')
    ).not.toThrow()
  })
})
