import { assertToken } from '@echo/api/helpers/assert-token'
import { apiUrl } from '@echo/api/routing/api-url'
import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { prop } from 'ramda'

export function createOfferFetcher(data: CreateOfferRequest, token: string | undefined) {
  assertToken(token)
  return axios
    .put<OfferResponse>(apiUrl.offer.create, {
      data,
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(prop('data'))
}
