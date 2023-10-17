import type { Listing } from '@echo/model/types/listing'
import { assertListingState } from '@server/helpers/listing/assert-listing-state'

describe('helpers - listing - assertListingState', () => {
  const listing = { state: 'OPEN' } as Listing
  it('throws if listing state is not in the passed states', () => {
    expect(() => assertListingState(listing, 'FULFILLED', 'CANCELLED', 'PARTIALLY_FULFILLED')).toThrow()
  })
  it('does not throw if listing state is in the passed states', () => {
    expect(() => assertListingState(listing, 'OPEN')).not.toThrow()
  })
})
