import { assertSignature } from '@echo/api/helpers/assert-signature'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { HexString } from '@echo/utils/types/hex-string'
import axios from 'axios'
import { pick, prop } from 'ramda'

export interface AcceptOfferArgs {
  offerId: string
  signature: HexString | undefined
}
export function acceptOffer(args: AcceptOfferArgs) {
  assertSignature(args.signature)
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.accept.getUrl(pick(['offerId'], args)), pick(['signature'], args), {
      withCredentials: true
    })
    .then(prop('data'))
}
