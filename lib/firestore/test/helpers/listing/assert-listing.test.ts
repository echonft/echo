import { assertListing } from '@echo/firestore/helpers/listing/assert/assert-listing'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - assert - assertListing', () => {
  it('throw if the listing is undefined', () => {
    expect(() => assertListing(undefined)).toThrow()
  })
  it('throw if the listing does not have an id', () => {
    const listing = {
      id: undefined
    } as unknown as FirestoreListing
    expect(() => assertListing(listing)).toThrow()
  })
  it('does not throw if the listing defined and have an id', () => {
    const listing = {
      id: 'listing-id'
    } as FirestoreListing
    expect(() => assertListing(listing)).not.toThrow()
  })
})
