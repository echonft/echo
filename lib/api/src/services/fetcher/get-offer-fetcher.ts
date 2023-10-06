import { assertToken } from '@echo/api/helpers/assert-token'
import { offerApiUrl } from '@echo/api/routing/offer-api-url'
import { getData } from '@echo/api/services/fetcher/base/get-data'
import { GetOfferResponse } from '@echo/api/types/responses/get-offer-response'

export function getOfferFetcher(offerId: string, token: string) {
  assertToken(token)
  return getData<GetOfferResponse>(offerApiUrl(offerId), token)
}
