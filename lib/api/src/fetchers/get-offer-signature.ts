import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export function getOfferSignature(args: GetOfferSignatureArgs) {
  return axios
    .get<OfferSignatureResponse>(apiUrlProvider.offer.signature.getUrl(pick(['offerId'], args)), {
      withCredentials: true
    })
    .then(prop('data'))
}
