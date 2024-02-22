import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, assoc, pipe } from 'ramda'

export function cancelListing(_args: CancelListingArgs): Promise<ListingResponse> {
  return delayPromise(
    pipe<[], ListingResponse, Promise<ListingResponse>>(
      applySpec<ListingResponse>({
        listing: pipe<[], Listing, Listing, Listing>(
          getListingMock,
          assoc('state', LISTING_STATE_CANCELLED),
          assoc('readOnly', true)
        )
      }),
      toPromise
    ),
    800
  )()
}
