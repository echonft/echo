import { assertSignature } from '@echo/api/helpers/assert-signature'
import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import type { HexString } from '@echo/utils/types/hex-string'
import axios from 'axios'
import { pick, prop } from 'ramda'

export interface AcceptOfferArgs extends TokenArgs {
  offerId: string
  signature: HexString | undefined
}
export function acceptOffer(args: AcceptOfferArgs) {
  assertToken(args)
  assertSignature(args.signature)
  return axios
    .post<OfferResponse>(apiUrlProvider.offer.accept.get(pick(['offerId'], args)), {
      data: pick(['signature'], args),
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
