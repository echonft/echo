import { assertOffer } from '@echo/firestore/helpers/offer/assert/assert-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - assert - assertOffer', () => {
  it('throw if the offer is undefined', () => {
    expect(() => assertOffer(undefined)).toThrow()
  })
  it('does not throw if the offer is defined', () => {
    const offer = {
      id: 'offer-id'
    } as FirestoreOffer
    expect(() => assertOffer(offer)).not.toThrow()
  })
})
