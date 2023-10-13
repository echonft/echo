import { assertToken } from '@echo/api/helpers/assert-token'
import { acceptOfferApiUrl } from '@echo/api/routing/accept-offer-api-url'
import { postData } from '@echo/api/services/fetcher/base/post-data'
import { AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import { EmptyResponse } from '@echo/api/types/responses/empty-response'

export function acceptOfferFetcher(offerId: string, signature: string, token: string | undefined) {
  assertToken(token)
  return postData<AcceptOfferRequest, EmptyResponse>(acceptOfferApiUrl(offerId), { signature }, token)
}
