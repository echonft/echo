import { assertToken } from '@echo/api/helpers/assert-token'
import { cancelListingApiUrl } from '@echo/api/routing/cancel-listing-api-url'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { putData } from '@echo/utils/services/put-data'

export function cancelListingFetcher(listingId: string, token: string | undefined) {
  assertToken(token)
  return putData<never, ListingResponse>(cancelListingApiUrl(listingId), undefined, token)
}
