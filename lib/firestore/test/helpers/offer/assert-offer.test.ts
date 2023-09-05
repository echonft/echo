import { assertOffer } from '../../../src/helpers/offer/assert/assert-offer'
import { Offer } from '@echo/firestore-types'
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
