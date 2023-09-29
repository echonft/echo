import { putData } from '@echo/api/helpers/api-fetcher'
import { createOfferApiUrl } from '@echo/api/routing/create-offer-api-url'
import { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { GetOfferResponse } from '@echo/api/types/responses/get-offer-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function createOfferFetcher(
  senderItems: NonEmptyArray<OfferItemRequest>,
  receiverItems: NonEmptyArray<OfferItemRequest>,
  token: string | undefined
) {
  if (isNilOrEmpty(token)) {
    throw Error('not logged in')
  }
  return putData<CreateOfferRequest, GetOfferResponse>(createOfferApiUrl(), token, { senderItems, receiverItems })
}
