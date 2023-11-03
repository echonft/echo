import { assertToken } from '@echo/api/helpers/assert-token'
import { cancelListingApiUrl } from '@echo/api/routing/cancel-listing-api-url'
import { putData } from '@echo/api/services/fetcher/base/put-data'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'

export function cancelListingFetcher(listingId: string, token: string | undefined) {
  assertToken(token)
  return putData<never, ListingResponse>(cancelListingApiUrl(listingId), undefined, token)
}
