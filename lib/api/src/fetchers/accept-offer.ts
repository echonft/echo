import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { prop } from 'ramda'

export function acceptOffer(args: AcceptOfferArgs) {
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.accept.getUrl(args), {
      withCredentials: true
    })
    .then(prop('data'))
}
