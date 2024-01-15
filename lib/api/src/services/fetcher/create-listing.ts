import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import axios from 'axios'
import { prop } from 'ramda'

export function createListing(args: CreateListingRequest) {
  return axios
    .put<ListingResponse>(apiUrlProvider.listing.create.getUrl(), args, {
      withCredentials: true
    })
    .then(prop('data'))
}
