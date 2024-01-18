import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { GetOfferArgs } from '@echo/api/types/fetchers/get-offer-args'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export function getOffer(args: GetOfferArgs) {
  return axios
    .get<OfferResponse>(apiUrlProvider.offer.get.getUrl(pick(['offerId'], args)), {
      withCredentials: true
    })
    .then(prop('data'))
}
