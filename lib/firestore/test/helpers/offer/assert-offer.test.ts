import { assertOffer } from '@echo/firestore/helpers/offer/assert/assert-offer'
import type { Offer } from '@echo/model/types/offer'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - assert - assertOffer', () => {
  it('throw if the offer is undefined', () => {
    expect(() => assertOffer(undefined)).toThrow()
  })
  it('does not throw if the offer is defined', () => {
    const offer = {
      id: 'offer-id'
    } as Offer
    expect(() => assertOffer(offer)).not.toThrow()
  })
})
