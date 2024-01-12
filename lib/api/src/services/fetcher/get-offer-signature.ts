import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export interface GetOfferSignatureArgs {
  offerId: string
}
export function getOfferSignature(args: GetOfferSignatureArgs) {
  return axios
    .get<OfferSignatureResponse>(apiUrlProvider.offer.signature.getUrl(pick(['offerId'], args)), {
      withCredentials: true
    })
    .then(prop('data'))
}
