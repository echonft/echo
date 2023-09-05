import { assertListingStateIs } from '../../../src/helpers/listing/assert/assert-listing-state-is'
import { Listing } from '@echo/firestore-types'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - assert - assertListingStateIs', () => {
  it('throw if the listing is undefined', () => {
    expect(() => assertListingStateIs(undefined, 'OPEN')).toThrow()
  })
  it('throw if the listing does not have the given state', () => {
    let listing = {
      id: 'listing-id',
      state: undefined
    } as unknown as Listing
    expect(() => assertListingStateIs(listing, 'OPEN')).toThrow()
    listing = {
      id: 'listing-id',
      state: 'CANCELLED'
    } as Listing
    expect(() => assertListingStateIs(listing, 'OPEN')).toThrow()
  })
  it('does not throw if the listing is not expired', () => {
    const listing = {
      id: 'listing-id',
      state: 'OPEN'
    } as Listing
    expect(() => assertListingStateIs(listing, 'OPEN')).not.toThrow()
  })
})
