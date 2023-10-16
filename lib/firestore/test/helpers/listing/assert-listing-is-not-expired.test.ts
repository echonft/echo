import { assertListingIsNotExpired } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-expired'
import type { Listing } from '@echo/model/types/listing'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('helpers - listing - assert - assertListingIsNotExpired', () => {
  it('throw if the listing is undefined', () => {
    expect(() => assertListingIsNotExpired(undefined)).toThrow()
  })
  it('throw if the listing is expired', () => {
    let listing = {
      id: 'listing-id',
      expired: true
    } as Listing
    expect(() => assertListingIsNotExpired(listing)).toThrow()
    listing = {
      id: 'listing-id',
      expiresAt: dayjs().subtract(1, 'd').unix()
    } as Listing
    expect(() => assertListingIsNotExpired(listing)).toThrow()
  })
  it('does not throw if the listing is not expired', () => {
    let listing = {
      id: 'listing-id',
      expired: false
    } as Listing
    expect(() => assertListingIsNotExpired(listing)).not.toThrow()
    listing = {
      id: 'listing-id',
      expiresAt: dayjs().add(1, 'd').unix()
    } as Listing
    expect(() => assertListingIsNotExpired(listing)).not.toThrow()
  })
})
