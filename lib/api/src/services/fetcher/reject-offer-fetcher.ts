import { assertToken } from '@echo/api/helpers/assert-token'
import { apiUrl } from '@echo/api/routing/api-url'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { prop } from 'ramda'

export function rejectOfferFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return axios
    .post<OfferResponse>(apiUrl.offer.reject(offerId), {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(prop('data'))
}
