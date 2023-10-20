import { assertToken } from '@echo/api/helpers/assert-token'
import { createListingApiUrl } from '@echo/api/routing/create-listing-api-url'
import { putData } from '@echo/api/services/fetcher/base/put-data'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'

export function createListingFetcher(parameters: CreateListingRequest, token: string | undefined) {
  assertToken(token)
  return putData<CreateListingRequest, ListingResponse>(createListingApiUrl(), parameters, token)
}
