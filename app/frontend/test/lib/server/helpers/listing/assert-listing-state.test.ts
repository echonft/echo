import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { assertListingState } from '@server/helpers/listing/assert-listing-state'

describe('helpers - listing - assertListingState', () => {
  const listing = { state: 'OPEN' } as FirestoreListing
  it('throws if listing state is not in the passed states', () => {
    expect(() => assertListingState(listing, 'FULFILLED', 'CANCELLED', 'INVALID')).toThrow()
  })
  it('does not throw if listing state is in the passed states', () => {
    expect(() => assertListingState(listing, 'OPEN')).not.toThrow()
  })
})
