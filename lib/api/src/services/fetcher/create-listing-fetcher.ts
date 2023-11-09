import { assertToken } from '@echo/api/helpers/assert-token'
import { createListingApiUrl } from '@echo/api/routing/create-listing-api-url'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { putData } from '@echo/utils/services/put-data'

export function createListingFetcher(parameters: CreateListingRequest, token: string | undefined) {
  assertToken(token)
  return putData<CreateListingRequest, ListingResponse>(createListingApiUrl(), parameters, token)
}
