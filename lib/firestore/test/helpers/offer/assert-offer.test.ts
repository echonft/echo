import { assertOffer } from '../../../src/helpers/offer/assert-offer'
import { Offer } from '@echo/firestore-types'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - assertOffer', () => {
  it('throw if the offer is undefined', () => {
    expect(() => assertOffer(undefined)).toThrow()
  })
  it('throw if the offer is expired', () => {
    const offer = {
      expired: true,
      state: 'OPEN'
    } as Offer
    expect(() => assertOffer(offer)).toThrow()
  })
})
