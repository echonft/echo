import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrl } from '@echo/api/routing/api-url'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { prop } from 'ramda'

export interface CancelListingArgs extends TokenArgs {
  listingId: string
}

export function cancelListing(args: CancelListingArgs) {
  assertToken(args)
  return axios
    .post<ListingResponse>(apiUrl.listing.cancel(args.listingId), {
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
