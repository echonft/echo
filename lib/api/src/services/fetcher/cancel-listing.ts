import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { pick, prop } from 'ramda'

export interface CancelListingArgs extends TokenArgs {
  listingId: string
}

export function cancelListing(args: CancelListingArgs) {
  assertToken(args)
  return axios
    .post<ListingResponse>(apiUrlProvider.listing.cancel.get(pick(['listingId'], args)), {
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
