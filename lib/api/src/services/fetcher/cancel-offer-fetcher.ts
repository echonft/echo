import { assertToken } from '@echo/api/helpers/assert-token'
import { cancelOfferApiUrl } from '@echo/api/routing/cancel-offer-api-url'
import { postData } from '@echo/api/services/fetcher/base/post-data'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'

export function cancelOfferFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return postData<never, EmptyResponse>(cancelOfferApiUrl(offerId), undefined, token)
}
