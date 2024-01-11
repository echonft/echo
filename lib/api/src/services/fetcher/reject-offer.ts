import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export interface RejectOfferArgs {
  offerId: string
}

export function rejectOffer(args: RejectOfferArgs) {
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.reject.getUrl(pick(['offerId'], args)), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
