import { assertToken } from '@echo/api/helpers/assert-token'
import { apiUrl } from '@echo/api/routing/api-url'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import axios from 'axios'
import { prop } from 'ramda'

export function getOfferSignatureFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return axios
    .get<OfferSignatureResponse>(apiUrl.offer.signature(offerId), {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(prop('data'))
}
