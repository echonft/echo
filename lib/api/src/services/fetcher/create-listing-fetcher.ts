import { assertToken } from '@echo/api/helpers/assert-token'
import { apiUrl } from '@echo/api/routing/api-url'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import axios from 'axios'
import { prop } from 'ramda'

export function createListingFetcher(data: CreateListingRequest, token: string | undefined) {
  assertToken(token)
  return axios
    .put<ListingResponse>(apiUrl.listing.create, {
      data,
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(prop('data'))
}
