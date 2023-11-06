import { guarded_assertListing } from '@echo/frontend/lib/server/helpers/listing/assert/guarded_assert-listing'
import { type Listing } from '@echo/model/types/listing'

describe('helpers - listing - assert - guarded_assertListing', () => {
  it('throws if listing is undefined', () => {
    expect(() => guarded_assertListing(undefined)).toThrow()
  })
  it('does not throw if listing is defined', () => {
    expect(() => guarded_assertListing({ id: 'listingId' } as Listing)).not.toThrow()
  })
})
