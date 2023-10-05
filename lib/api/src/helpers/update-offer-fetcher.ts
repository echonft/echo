import { postData } from '@echo/api/helpers/api-fetcher'
import { updateOfferApiUrl } from '@echo/api/routing/update-offer-api-url'
import { EmptyResponse } from '@echo/api/types/responses/empty-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function updateOfferFetcher(offerId: string, action: 'CANCEL' | 'REJECT' | 'ACCEPT', token: string | undefined) {
  if (isNilOrEmpty(token)) {
    throw Error('not logged in')
  }
  return postData<never, EmptyResponse>(updateOfferApiUrl(offerId, action), undefined, token)
}
