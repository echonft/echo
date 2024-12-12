import { ListingState } from '@echo/model/constants/listing-state'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import { rangeDelay } from 'delay'
import { assoc, pipe } from 'ramda'

export function cancelListing(): Promise<Listing> {
  const value = pipe(assoc('state', ListingState.Cancelled), assoc('locked', true))(listingMock)
  return rangeDelay(800, 1600, { value })
}
