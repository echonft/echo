import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function createListing(_args: CreateListingRequest): Promise<ListingResponse> {
  return delayPromise(
    Promise.resolve({
      listing: getListingMock()
    }),
    800
  )
}
