import { assertSignature } from '@echo/api/helpers/assert-signature'
import { assertToken } from '@echo/api/helpers/assert-token'
import { acceptOfferApiUrl } from '@echo/api/routing/accept-offer-api-url'
import { type AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { postData } from '@echo/utils/services/post-data'
import type { HexString } from '@echo/utils/types/hex-string'

export function acceptOfferFetcher(offerId: string, signature: HexString | undefined, token: string | undefined) {
  assertToken(token)
  assertSignature(signature)
  return postData<AcceptOfferRequest, OfferResponse>(acceptOfferApiUrl(offerId), { signature }, token)
}
