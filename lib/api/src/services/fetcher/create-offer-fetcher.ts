import { assertToken } from '@echo/api/helpers/assert-token'
import { createOfferApiUrl } from '@echo/api/routing/create-offer-api-url'
import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { putData } from '@echo/utils/services/put-data'

export function createOfferFetcher(parameters: CreateOfferRequest, token: string | undefined) {
  assertToken(token)
  return putData<CreateOfferRequest, OfferResponse>(createOfferApiUrl(), parameters, token)
}
