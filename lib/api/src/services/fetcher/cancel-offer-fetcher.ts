import { assertToken } from '@echo/api/helpers/assert-token'
import { cancelOfferApiUrl } from '@echo/api/routing/cancel-offer-api-url'
import { postData } from '@echo/api/services/fetcher/base/post-data'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'

export function cancelOfferFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return postData<never, OfferResponse>(cancelOfferApiUrl(offerId), undefined, token)
}
