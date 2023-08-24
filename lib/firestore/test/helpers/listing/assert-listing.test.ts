import { assertListing } from '../../../src/helpers/listing/assert-listing'
import { Listing } from '../../../src/types/model/listing'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - assertListing', () => {
  it('throw if the listing is undefined', () => {
    expect(() => assertListing(undefined)).toThrow()
  })
  it('throw if the listing is expired', () => {
    const listing = {
      expired: true,
      state: 'OPEN'
    } as Listing
    expect(() => assertListing(listing)).toThrow()
  })
  it('throw if the listing is cancelled', () => {
    const listing = {
      expired: false,
      state: 'CANCELLED'
    } as Listing
    expect(() => assertListing(listing)).toThrow()
  })
  it('throw if the listing is fulfilled', () => {
    const listing = {
      expired: false,
      state: 'FULFILLED'
    } as Listing
    expect(() => assertListing(listing)).toThrow()
  })
  it('throw if the listing is invalid', () => {
    const listing = {
      expired: false,
      state: 'INVALID'
    } as Listing
    expect(() => assertListing(listing)).toThrow()
  })
  it('does not throw if the listing is open and not expired', () => {
    const listing = {
      expired: false,
      state: 'OPEN'
    } as Listing
    expect(() => assertListing(listing)).not.toThrow()
  })
})
