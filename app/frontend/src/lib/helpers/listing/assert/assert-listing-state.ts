import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { assertListingStateTransition as modelAssertListingState } from '@echo/model/helpers/listing/assert/assert-listing-state-transition'
import { type Listing } from '@echo/model/types/listing'
import { type ListingState } from '@echo/model/types/listing-state'

export function assertListingState(
  listing: Listing,
  toState: ListingState
): asserts listing is Omit<Listing, 'state'> & Record<'state', ListingState> {
  try {
    modelAssertListingState(listing, toState)
  } catch (err) {
    throw new BadRequestError(`listing ${listing.slug} state is wrong`)
  }
}
