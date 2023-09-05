import { assertListingIsNotExpired } from '../../../src/helpers/listing/assert/assert-listing-is-not-expired'
import { Listing } from '@echo/firestore-types'
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
      expiresAt: dayjs().subtract(1, 'd')
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
      expiresAt: dayjs().add(1, 'd')
    } as Listing
    expect(() => assertListingIsNotExpired(listing)).not.toThrow()
  })
})
