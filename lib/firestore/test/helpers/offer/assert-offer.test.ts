import { assertOffer } from '../../../src/helpers/offer/assert-offer'
import { Offer } from '../../../src/types/model/offer'
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
  it('throw if the offer is cancelled', () => {
    const offer = {
      expired: false,
      state: 'CANCELLED'
    } as Offer
    expect(() => assertOffer(offer)).toThrow()
  })
  it('throw if the offer is accepted', () => {
    const offer = {
      expired: false,
      state: 'ACCEPTED'
    } as Offer
    expect(() => assertOffer(offer)).toThrow()
  })
  it('throw if the offer is invalid', () => {
    const offer = {
      expired: false,
      state: 'INVALID'
    } as Offer
    expect(() => assertOffer(offer)).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = {
      expired: false,
      state: 'REJECTED'
    } as Offer
    expect(() => assertOffer(offer)).toThrow()
  })
  it('does not throw if the offer is open and not expired', () => {
    const offer = {
      expired: false,
      state: 'OPEN'
    } as Offer
    expect(() => assertOffer(offer)).not.toThrow()
  })
})
