import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { ListingState } from '@echo/model/constants/listing-state'
import { getListingMock } from '@echo/model/mocks/listing/get-listing-mock'
import type { WithSlug } from '@echo/model/types/with-slug'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { assoc, objOf, pipe } from 'ramda'

export function cancelListing(_args: WithSlug): Promise<ListingResponse> {
  return pipe(
    getListingMock,
    assoc('state', ListingState.Cancelled),
    assoc('locked', true),
    objOf('listing'),
    toPromise,
    delayPromise(800)
  )()
}
