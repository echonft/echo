import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { assertListingState as modelAssertListingState } from '@echo/model/helpers/listing/assert/assert-listing-state'
import { type Listing } from '@echo/model/types/listing'
import { type ListingState } from '@echo/model/types/listing-state'

export function assertListingState(
  listing: Listing,
  toState: ListingState
): asserts listing is Listing & Record<ListingState, 'state'> {
  try {
    modelAssertListingState(listing, toState)
  } catch (err) {
    throw new BadRequestError(`listing with id ${listing.id} state is wrong`, err)
  }
}
