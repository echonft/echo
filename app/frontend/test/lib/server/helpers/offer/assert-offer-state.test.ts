import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { assertOfferState } from '@server/helpers/offer/assert-offer-state'

describe('helpers - offer - assertOfferState', () => {
  const offer = { state: 'OPEN' } as FirestoreOffer
  it('throws if offer state is not in the passed states', () => {
    expect(() => assertOfferState(offer, 'ACCEPTED', 'CANCELLED', 'INVALID')).toThrow()
  })
  it('does not throw if offer state is in the passed states', () => {
    expect(() => assertOfferState(offer, 'OPEN', 'ACCEPTED')).not.toThrow()
  })
})
