import { ListingState } from '@echo/model/constants/listing-state'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { assoc, pipe } from 'ramda'

export function cancelListing(): Promise<Listing> {
  return pipe(assoc('state', ListingState.Cancelled), assoc('locked', true), toPromise, delayPromise(800))(listingMock)
}
