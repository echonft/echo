import { assertListingStateIs } from '@echo/firestore/helpers/listing/assert/assert-listing-state-is'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - assert - assertListingStateIs', () => {
  it('throw if the listing is undefined', () => {
    expect(() => assertListingStateIs(undefined, 'OPEN')).toThrow()
  })
  it('throw if the listing does not have the given state', () => {
    let listing = {
      id: 'listing-id',
      state: undefined
    } as unknown as FirestoreListing
    expect(() => assertListingStateIs(listing, 'OPEN')).toThrow()
    listing = {
      id: 'listing-id',
      state: 'CANCELLED'
    } as FirestoreListing
    expect(() => assertListingStateIs(listing, 'OPEN')).toThrow()
  })
  it('does not throw if the listing is not expired', () => {
    const listing = {
      id: 'listing-id',
      state: 'OPEN'
    } as FirestoreListing
    expect(() => assertListingStateIs(listing, 'OPEN')).not.toThrow()
  })
})
