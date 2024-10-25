import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { ListingState } from '@echo/model/constants/listing-state'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { assoc, objOf, pipe } from 'ramda'

export function cancelListing(): Promise<ListingResponse> {
  return pipe(
    assoc('state', ListingState.Cancelled),
    assoc('locked', true),
    objOf('listing'),
    toPromise,
    delayPromise(800)
  )(listingMock)
}
