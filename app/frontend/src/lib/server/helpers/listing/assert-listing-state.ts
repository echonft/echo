import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { includes } from 'ramda'

export function assertListingState(
  listing: FirestoreListing,
  ...states: Array<FirestoreListingState>
): asserts listing is FirestoreListing & { state: FirestoreListingState } {
  if (!includes(listing.state, states)) {
    throw new BadRequestError(
      `listing with id ${listing.id} and state ${
        listing.state
      } was expected to have any state contained in ${JSON.stringify(states)}`
    )
  }
}
