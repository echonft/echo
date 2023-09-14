import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { assertOffer } from '@server/helpers/offer/assert-offer'

describe('helpers - offer - assertOffer', () => {
  it('throws if offer is undefined', () => {
    expect(() => assertOffer(undefined)).toThrow()
  })
  it('does not throw if offer is defined', () => {
    expect(() => assertOffer({ id: 'offerId' } as FirestoreOffer)).not.toThrow()
  })
})
