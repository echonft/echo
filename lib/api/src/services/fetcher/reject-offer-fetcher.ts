import { assertToken } from '@echo/api/helpers/assert-token'
import { rejectOfferApiUrl } from '@echo/api/routing/reject-offer-api-url'
import { postData } from '@echo/api/services/fetcher/base/post-data'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'

export function rejectOfferFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return postData<never, OfferResponse>(rejectOfferApiUrl(offerId), undefined, token)
}
