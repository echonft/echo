import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrl } from '@echo/api/routing/api-url'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { prop } from 'ramda'

export interface GetOfferSignatureArgs extends TokenArgs {
  offerId: string
}
export function getOfferSignature(args: GetOfferSignatureArgs) {
  assertToken(args)
  return axios
    .get<OfferSignatureResponse>(apiUrl.offer.signature(args.offerId), {
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
