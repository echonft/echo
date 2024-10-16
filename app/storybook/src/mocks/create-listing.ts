import type { CreateListingRequestBuilderArgs } from '@echo/api/types/request-builders/create-listing-request-builder-args'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { getListingMock } from '@echo/model/mocks/listing/get-listing-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, pipe } from 'ramda'

export function createListing(_args: CreateListingRequestBuilderArgs): Promise<ListingResponse> {
  return delayPromise(
    pipe<[], ListingResponse, Promise<ListingResponse>>(
      applySpec<ListingResponse>({
        listing: getListingMock
      }),
      toPromise
    ),
    800
  )()
}
