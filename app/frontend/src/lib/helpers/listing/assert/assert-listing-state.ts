import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { createError } from '@echo/frontend/lib/helpers/error/create-error'
import { assertListingStateTransition } from '@echo/model/helpers/listing/assert/assert-listing-state-transition'
import { type Listing } from '@echo/model/types/listing'
import { type ListingState } from '@echo/model/types/listing-state'

export function assertListingState(
  listing: Listing,
  toState: ListingState
): asserts listing is Omit<Listing, 'state'> & Record<'state', ListingState> {
  try {
    assertListingStateTransition(listing, toState)
  } catch (err) {
    throw createError(ErrorStatus.BAD_REQUEST, err)
  }
}
