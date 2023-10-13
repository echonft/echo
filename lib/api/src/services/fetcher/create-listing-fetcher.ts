import { assertToken } from '@echo/api/helpers/assert-token'
import { createListingApiUrl } from '@echo/api/routing/create-listing-api-url'
import { putData } from '@echo/api/services/fetcher/base/put-data'
import { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { GetListingResponse } from '@echo/api/types/responses/get-listing-response'

export function createListingFetcher(parameters: CreateListingRequest, token: string | undefined) {
  assertToken(token)
  return putData<CreateListingRequest, GetListingResponse>(createListingApiUrl(), parameters, token)
}
