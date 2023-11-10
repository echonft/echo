import { assertToken } from '@echo/api/helpers/assert-token'
import { apiUrl } from '@echo/api/routing/api-url'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { prop } from 'ramda'

export function cancelOfferFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return axios
    .post<OfferResponse>(apiUrl.offer.cancel(offerId), {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(prop('data'))
}
