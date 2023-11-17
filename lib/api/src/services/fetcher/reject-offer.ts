import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { pick, prop } from 'ramda'

export interface RejectOfferArgs extends TokenArgs {
  offerId: string
}

export function rejectOffer(args: RejectOfferArgs) {
  assertToken(args)
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.reject.get(pick(['offerId'], args)), {
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
