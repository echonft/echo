import { assertToken } from '@echo/api/helpers/assert-token'
import { offerApiUrl } from '@echo/api/routing/offer-api-url'
import { getData } from '@echo/api/services/fetcher/base/get-data'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'

export function getOfferFetcher(offerId: string, token: string) {
  assertToken(token)
  return getData<OfferResponse>(offerApiUrl(offerId), token)
}
