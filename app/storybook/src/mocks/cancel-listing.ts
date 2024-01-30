import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { assoc, pipe } from 'ramda'

export function cancelListing(_args: CancelListingArgs): Promise<ListingResponse> {
  return delayPromise(
    Promise.resolve({
      listing: pipe<[], Listing, Listing, Listing>(
        getListingMock,
        assoc('state', LISTING_STATE_CANCELLED),
        assoc('readOnly', true)
      )()
    }),
    800
  )
}
