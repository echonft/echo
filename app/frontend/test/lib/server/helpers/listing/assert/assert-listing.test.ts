import { type Listing } from '@echo/model/types/listing'
import { assertListing } from '@server/helpers/listing/assert/assert-listing'

describe('helpers - listing - assert - assertListing', () => {
  it('throws if listing is undefined', () => {
    expect(() => assertListing(undefined)).toThrow()
  })
  it('does not throw if listing is defined', () => {
    expect(() => assertListing({ id: 'listingId' } as Listing)).not.toThrow()
  })
})
