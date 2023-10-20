import { listingApiUrl } from '@echo/api/routing/listing-api-url'
import { getData } from '@echo/api/services/fetcher/base/get-data'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'

export function getListingFetcher(listingId: string) {
  return getData<ListingResponse>(listingApiUrl(listingId))
}
