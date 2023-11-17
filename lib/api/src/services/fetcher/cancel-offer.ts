import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { pick, prop } from 'ramda'

export interface CancelOfferArgs extends TokenArgs {
  offerId: string
}
export function cancelOffer(args: CancelOfferArgs) {
  assertToken(args)
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.cancel.getUrl(pick(['offerId'], args)), {
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
