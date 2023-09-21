import { assertListingIsNotExpired } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-expired'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
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
    } as FirestoreListing
    expect(() => assertListingIsNotExpired(listing)).toThrow()
    listing = {
      id: 'listing-id',
      expiresAt: dayjs().subtract(1, 'd')
    } as FirestoreListing
    expect(() => assertListingIsNotExpired(listing)).toThrow()
  })
  it('does not throw if the listing is not expired', () => {
    let listing = {
      id: 'listing-id',
      expired: false
    } as FirestoreListing
    expect(() => assertListingIsNotExpired(listing)).not.toThrow()
    listing = {
      id: 'listing-id',
      expiresAt: dayjs().add(1, 'd')
    } as FirestoreListing
    expect(() => assertListingIsNotExpired(listing)).not.toThrow()
  })
})
