import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrl } from '@echo/api/routing/api-url'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { prop } from 'ramda'

export interface RejectOfferArgs extends TokenArgs {
  offerId: string
}

export function rejectOffer(args: RejectOfferArgs) {
  assertToken(args)
  return axios
    .post<OfferResponse>(apiUrl.offer.reject(args.offerId), {
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
