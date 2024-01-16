import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_OPEN,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { listingIsFinalOrExpired } from '@echo/model/helpers/listing/listing-is-final-or-expired'
import type { Listing } from '@echo/model/types/listing'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('helpers - listing - listingIsFinalOrExpired', () => {
  it('returns true if listing is fulfilled', () => {
    expect(
      listingIsFinalOrExpired({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_FULFILLED
      } as Listing)
    ).toBeTruthy()
  })

  it('returns true if listing is cancelled', () => {
    expect(
      listingIsFinalOrExpired({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_CANCELLED
      } as Listing)
    ).toBeTruthy()
  })

  it('returns true if listing is expired', () => {
    expect(
      listingIsFinalOrExpired({
        id: 'test',
        expired: true,
        expiresAt: dayjs().subtract(1, 'd').unix(),
        state: OFFER_STATE_OPEN
      } as Listing)
    ).toBeTruthy()
  })

  it('returns false if listing is expired', () => {
    expect(
      listingIsFinalOrExpired({
        id: 'test',
        expiresAt: dayjs().subtract(1, 'd').unix(),
        state: OFFER_STATE_OPEN
      } as Listing)
    ).toBeFalsy()
  })

  it('returns false if listing is open and not expired', () => {
    expect(
      listingIsFinalOrExpired({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_OPEN
      } as Listing)
    ).toBeFalsy()
  })

  it('returns false if listing is partially fulfilled', () => {
    expect(
      listingIsFinalOrExpired({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_PARTIALLY_FULFILLED
      } as Listing)
    ).toBeFalsy()
  })

  it('returns false if listing is offers pending', () => {
    expect(
      listingIsFinalOrExpired({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_OFFERS_PENDING
      } as Listing)
    ).toBeFalsy()
  })
})
