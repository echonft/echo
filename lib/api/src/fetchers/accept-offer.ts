import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import axios from 'axios'
import { isNil, pick, prop } from 'ramda'

export function acceptOffer(args: AcceptOfferArgs) {
  if (isNil(args) || isNilOrEmpty(args.signature)) {
    throw Error('signature is required')
  }
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.accept.getUrl(pick(['offerId'], args)), pick(['signature'], args), {
      withCredentials: true
    })
    .then(prop('data'))
}
