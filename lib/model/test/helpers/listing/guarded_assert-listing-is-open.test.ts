import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_OPEN,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { guarded_assertListingIsOpen } from '@echo/model/helpers/listing/assert/guarded_assert-listing-is-open'
import type { Listing } from '@echo/model/types/listing'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('helpers - listing - assert - guarded_assertListingIsOpen', () => {
  it('returns false if listing is fulfilled', () => {
    expect(
      guarded_assertListingIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_FULFILLED
      } as Listing)
    ).toBeFalsy()
  })

  it('returns false if listing is cancelled', () => {
    expect(
      guarded_assertListingIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_CANCELLED
      } as Listing)
    ).toBeFalsy()
  })

  it('returns false if listing is expired', () => {
    expect(
      guarded_assertListingIsOpen({
        id: 'test',
        expired: true,
        expiresAt: dayjs().subtract(1, 'd').unix(),
        state: OFFER_STATE_OPEN
      } as Listing)
    ).toBeFalsy()
  })

  it('returns false if listing is expired', () => {
    expect(
      guarded_assertListingIsOpen({
        id: 'test',
        expiresAt: dayjs().subtract(1, 'd').unix(),
        state: OFFER_STATE_OPEN
      } as Listing)
    ).toBeFalsy()
  })

  it('returns true if listing is open and not expired', () => {
    expect(
      guarded_assertListingIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_OPEN
      } as Listing)
    ).toBeTruthy()
  })

  it('returns true if listing is partially fulfilled', () => {
    expect(
      guarded_assertListingIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_PARTIALLY_FULFILLED
      } as Listing)
    ).toBeTruthy()
  })

  it('returns true if listing is offers pending', () => {
    expect(
      guarded_assertListingIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: LISTING_STATE_OFFERS_PENDING
      } as Listing)
    ).toBeTruthy()
  })
})
