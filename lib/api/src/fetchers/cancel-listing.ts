import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export function cancelListing(args: CancelListingArgs) {
  return axios
    .post<ListingResponse>(apiUrlProvider.listing.cancel.getUrl(pick(['listingId'], args)), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
