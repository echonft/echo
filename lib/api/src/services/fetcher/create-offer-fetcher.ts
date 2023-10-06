import { assertToken } from '@echo/api/helpers/assert-token'
import { createOfferApiUrl } from '@echo/api/routing/create-offer-api-url'
import { putData } from '@echo/api/services/fetcher/base/put-data'
import { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { GetOfferResponse } from '@echo/api/types/responses/get-offer-response'

export function createOfferFetcher(parameters: CreateOfferRequest, token: string | undefined) {
  assertToken(token)
  return putData<CreateOfferRequest, GetOfferResponse>(createOfferApiUrl(), parameters, token)
}
