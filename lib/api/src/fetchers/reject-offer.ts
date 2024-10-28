import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { Slug } from '@echo/model/types/slug'
import { apiPathProvider } from '@echo/routing/constants/api-path-provider'
import axios from 'axios'
import { prop } from 'ramda'

export function rejectOffer(args: Record<'slug', Slug>) {
  return axios
    .post<OfferResponse>(apiPathProvider.offer.reject.getUrl(args), undefined, {
      withCredentials: true
    })
    .then(prop('data'))
}
