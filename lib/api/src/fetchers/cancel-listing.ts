import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { Slug } from '@echo/model/types/slug'
import { apiPathProvider } from '@echo/routing/constants/api-path-provider'
import axios from 'axios'
import { prop } from 'ramda'

export function cancelListing(args: Record<'slug', Slug>) {
  return axios
    .post<ListingResponse>(apiPathProvider.listing.cancel.getUrl(args), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
