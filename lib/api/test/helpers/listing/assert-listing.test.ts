import { assertListing } from '../../../src/helpers/listing/assert-listing'
import { Listing } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - assertListing', () => {
  it('throws if listing is undefined', () => {
    expect(() => assertListing(undefined)).toThrow()
  })
  it('does not throw if listing is defined', () => {
    expect(() => assertListing({ id: 'listingId' } as Listing)).not.toThrow()
  })
})
