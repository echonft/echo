import { buildCreateListingRequest } from '@echo/api/request-builders/build-create-listing-request'
import type { CreateListingRequestBuilderArgs } from '@echo/api/types/request-builders/create-listing-request-builder-args'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { apiPathProvider } from '@echo/routing/constants/api-path-provider'
import axios from 'axios'
import { prop } from 'ramda'

export function createListing(args: CreateListingRequestBuilderArgs) {
  return axios
    .put<ListingResponse>(apiPathProvider.listing.create.getUrl(), buildCreateListingRequest(args), {
      withCredentials: true
    })
    .then(prop('data'))
}
