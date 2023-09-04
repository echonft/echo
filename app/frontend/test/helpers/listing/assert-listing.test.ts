import { assertListing } from '../../../src/lib/server/helpers/listing/assert-listing'
import { Listing } from '@echo/firestore-types'

describe('helpers - listing - assertListing', () => {
  it('throws if listing is undefined', () => {
    expect(() => assertListing(undefined)).toThrow()
  })
  it('does not throw if listing is defined', () => {
    expect(() => assertListing({ id: 'listingId' } as Listing)).not.toThrow()
  })
})
