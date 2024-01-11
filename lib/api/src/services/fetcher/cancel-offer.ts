import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export interface CancelOfferArgs {
  offerId: string
}
export function cancelOffer(args: CancelOfferArgs) {
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.cancel.getUrl(pick(['offerId'], args)), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
