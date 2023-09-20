import { ApiFetcher } from '@echo/api/helpers/api-fetcher'
import { createOfferApiUrl } from '@echo/api/routing/create-offer-api-url'
import { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { GetOfferResponse } from '@echo/api/types/responses/get-offer-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function createOfferFetcher(
  senderItems: OfferItemRequest[],
  receiverItems: OfferItemRequest[],
  token: string | undefined
) {
  if (isNilOrEmpty(token)) {
    throw Error('not logged in')
  }
  return new ApiFetcher(createOfferApiUrl())
    .method('PUT')
    .bearerToken(token)
    .body<CreateOfferRequest>({ senderItems, receiverItems })
    .fetch<GetOfferResponse>()
}
