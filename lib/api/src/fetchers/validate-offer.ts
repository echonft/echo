import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { ValidateOfferArgs } from '@echo/api/types/fetchers/validate-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { prop } from 'ramda'

export function validateOffer(args: ValidateOfferArgs) {
  return axios
    .get<OfferResponse>(apiUrlProvider.offer.validate.getUrl(args), {
      withCredentials: true
    })
    .then(prop('data'))
}
