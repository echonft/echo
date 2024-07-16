import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import axios from 'axios'
import { prop } from 'ramda'

export function cancelListing(args: CancelListingArgs) {
  return axios
    .post<ListingResponse>(apiPathProvider.listing.cancel.getUrl(args), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
