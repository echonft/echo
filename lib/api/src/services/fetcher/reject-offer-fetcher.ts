import { assertToken } from '@echo/api/helpers/assert-token'
import { rejectOfferApiUrl } from '@echo/api/routing/reject-offer-api-url'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { postData } from '@echo/utils/services/post-data'

export function rejectOfferFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return postData<never, OfferResponse>(rejectOfferApiUrl(offerId), undefined, token)
}
