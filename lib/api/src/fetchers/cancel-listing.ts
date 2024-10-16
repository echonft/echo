import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { WithSlug } from '@echo/model/types/with-slug'
import { apiPathProvider } from '@echo/routing/api-path-provider'
import axios from 'axios'
import { prop } from 'ramda'

export function cancelListing(args: WithSlug) {
  return axios
    .post<ListingResponse>(apiPathProvider.listing.cancel.getUrl(args), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
