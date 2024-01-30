import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { CancelOfferArgs } from '@echo/api/types/fetchers/cancel-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export function cancelOffer(args: CancelOfferArgs) {
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.cancel.getUrl(pick(['offerId'], args)), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
