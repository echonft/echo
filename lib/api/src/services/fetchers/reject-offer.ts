import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { RejectOfferArgs } from '@echo/api/types/fetchers/reject-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export function rejectOffer(args: RejectOfferArgs) {
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.reject.getUrl(pick(['offerId'], args)), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
