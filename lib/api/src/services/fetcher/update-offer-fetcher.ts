import { assertToken } from '@echo/api/helpers/assert-token'
import { updateOfferApiUrl } from '@echo/api/routing/update-offer-api-url'
import { postData } from '@echo/api/services/fetcher/base/post-data'
import { EmptyResponse } from '@echo/api/types/responses/empty-response'
import { UpdateOfferAction } from '@echo/api/types/update-offer-action'

export function updateOfferFetcher(offerId: string, action: UpdateOfferAction, token: string | undefined) {
  assertToken(token)
  return postData<never, EmptyResponse>(updateOfferApiUrl(offerId, action), undefined, token)
}
