import { assertToken } from '@echo/api/helpers/assert-token'
import { apiUrl } from '@echo/api/routing/api-url'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import axios from 'axios'
import { prop } from 'ramda'

export function cancelListingFetcher(listingId: string, token: string | undefined) {
  assertToken(token)
  return axios
    .post<ListingResponse>(apiUrl.listing.cancel(listingId), {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(prop('data'))
}
