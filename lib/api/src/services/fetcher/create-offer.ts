import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrl } from '@echo/api/routing/api-url'
import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { omit, prop } from 'ramda'

export interface CreateOfferArgs extends CreateOfferRequest, TokenArgs {}

export function createOffer(args: CreateOfferArgs) {
  assertToken(args)
  return axios
    .put<OfferResponse>(apiUrl.offer.create, {
      data: omit(['token'], args),
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
