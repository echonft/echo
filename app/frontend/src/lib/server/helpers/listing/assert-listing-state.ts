import type { Listing } from '@echo/model/types/listing'
import type { ListingState } from '@echo/model/types/listing-state'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { includes } from 'ramda'

export function assertListingState(
  listing: Listing,
  ...states: ListingState[]
): asserts listing is Listing & { state: ListingState } {
  if (!includes(listing.state, states)) {
    throw new BadRequestError(
      `listing with id ${listing.id} and state ${
        listing.state
      } was expected to have any state contained in ${JSON.stringify(states)}`
    )
  }
}
