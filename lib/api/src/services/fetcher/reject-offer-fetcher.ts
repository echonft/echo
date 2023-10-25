import { assertToken } from '@echo/api/helpers/assert-token'
import { rejectOfferApiUrl } from '@echo/api/routing/reject-offer-api-url'
import { postData } from '@echo/api/services/fetcher/base/post-data'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'

export function rejectOfferFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return postData<never, EmptyResponse>(rejectOfferApiUrl(offerId), undefined, token)
}
