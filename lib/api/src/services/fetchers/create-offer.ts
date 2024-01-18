import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { prop } from 'ramda'

export function createOffer(args: CreateOfferRequest) {
  return axios
    .put<OfferResponse>(apiUrlProvider.offer.create.getUrl(), args, {
      withCredentials: true
    })
    .then(prop('data'))
}
