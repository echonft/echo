import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { WithSlug } from '@echo/model/types/with-slug'
import { apiPathProvider } from '@echo/routing/api-path-provider'
import axios from 'axios'
import { prop } from 'ramda'

export function rejectOffer(args: WithSlug) {
  return axios
    .post<OfferResponse>(apiPathProvider.offer.reject.getUrl(args), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
