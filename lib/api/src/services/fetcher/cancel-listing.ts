import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export interface CancelListingArgs {
  listingId: string
}

export function cancelListing(args: CancelListingArgs) {
  return axios
    .post<ListingResponse>(apiUrlProvider.listing.cancel.getUrl(pick(['listingId'], args)), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
