import { assertToken } from '@echo/api/helpers/assert-token'
import { cancelListingApiUrl } from '@echo/api/routing/cancel-listing-api-url'
import { putData } from '@echo/api/services/fetcher/base/put-data'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'

export function cancelListingFetcher(listingId: string, token: string | undefined) {
  assertToken(token)
  return putData<never, EmptyResponse>(cancelListingApiUrl(listingId), undefined, token)
}
