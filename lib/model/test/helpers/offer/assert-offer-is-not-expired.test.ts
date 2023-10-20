import { assertOfferIsNotExpired } from '@echo/model/helpers/offer/assert/assert-offer-is-not-expired'
import { type Offer } from '@echo/model/types/offer'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('helpers - offer - assert - assertOfferIsNotExpired', () => {
  it('throw if the offer is undefined', () => {
    expect(() => assertOfferIsNotExpired(undefined)).toThrow()
  })
  it('throw if the offer is expired', () => {
    let offer = {
      id: 'offer-id',
      expired: true
    } as Offer
    expect(() => assertOfferIsNotExpired(offer)).toThrow()
    offer = {
      id: 'offer-id',
      expiresAt: dayjs().subtract(1, 'd').unix()
    } as Offer
    expect(() => assertOfferIsNotExpired(offer)).toThrow()
  })
  it('does not throw if the offer is not expired', () => {
    let offer = {
      id: 'offer-id',
      expired: false
    } as Offer
    expect(() => assertOfferIsNotExpired(offer)).not.toThrow()
    offer = {
      id: 'offer-id',
      expiresAt: dayjs().add(1, 'd').unix()
    } as Offer
    expect(() => assertOfferIsNotExpired(offer)).not.toThrow()
  })
})
