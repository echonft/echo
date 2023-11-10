import { assertSignature } from '@echo/api/helpers/assert-signature'
import { assertToken } from '@echo/api/helpers/assert-token'
import { apiUrl } from '@echo/api/routing/api-url'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { HexString } from '@echo/utils/types/hex-string'
import axios from 'axios'
import { prop } from 'ramda'

export function acceptOfferFetcher(offerId: string, signature: HexString | undefined, token: string | undefined) {
  assertToken(token)
  assertSignature(signature)
  return axios
    .post<OfferResponse>(apiUrl.offer.accept(offerId), {
      data: { signature },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(prop('data'))
}
