import { Listing } from '@echo/firestore-types'
import { assertListing } from '@server/helpers/listing/assert-listing'

describe('helpers - listing - assertListing', () => {
  it('throws if listing is undefined', () => {
    expect(() => assertListing(undefined)).toThrow()
  })
  it('does not throw if listing is defined', () => {
    expect(() => assertListing({ id: 'listingId' } as Listing)).not.toThrow()
  })
})
