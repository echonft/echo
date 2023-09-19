import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { assertOfferSenderIs } from '@server/helpers/offer/assert-offer-sender-is'

describe('helpers - offer - assertOfferSenderIs', () => {
  it('throws if offer sender does not have the passed username', () => {
    expect(() => assertOfferSenderIs({ state: 'OPEN' } as FirestoreOffer, 'username')).toThrow()
    expect(() => assertOfferSenderIs({ sender: {} } as FirestoreOffer, 'username')).toThrow()
    expect(() => assertOfferSenderIs({ sender: { username: 'not-the-same' } } as FirestoreOffer, 'username')).toThrow()
  })

  it('does not throw if offer sender has the passed username', () => {
    expect(() => assertOfferSenderIs({ sender: { username: 'username' } } as FirestoreOffer, 'username')).not.toThrow()
  })
})
