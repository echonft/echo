import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { omit, prop } from 'ramda'

export interface CreateListingArgs extends CreateListingRequest, TokenArgs {}
export function createListing(args: CreateListingArgs) {
  assertToken(args)
  return axios
    .put<ListingResponse>(apiUrlProvider.listing.create.get(), {
      data: omit(['token'], args),
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
