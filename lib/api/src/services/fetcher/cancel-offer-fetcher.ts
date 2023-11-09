import { assertToken } from '@echo/api/helpers/assert-token'
import { cancelOfferApiUrl } from '@echo/api/routing/cancel-offer-api-url'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { postData } from '@echo/utils/services/post-data'

export function cancelOfferFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return postData<never, OfferResponse>(cancelOfferApiUrl(offerId), undefined, token)
}
