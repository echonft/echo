import { assertSignature } from '@echo/api/helpers/assert-signature'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { pick, prop } from 'ramda'

export function acceptOffer(args: AcceptOfferArgs) {
  assertSignature(args.signature)
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.accept.getUrl(pick(['offerId'], args)), pick(['signature'], args), {
      withCredentials: true
    })
    .then(prop('data'))
}
