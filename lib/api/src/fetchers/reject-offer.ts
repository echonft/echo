import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { RejectOfferArgs } from '@echo/api/types/fetchers/reject-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { prop } from 'ramda'

export function rejectOffer(args: RejectOfferArgs) {
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.reject.getUrl(args), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
