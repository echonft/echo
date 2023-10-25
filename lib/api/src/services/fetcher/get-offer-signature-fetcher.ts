import { assertToken } from '@echo/api/helpers/assert-token'
import { offerSignatureApiUrl } from '@echo/api/routing/offer-signature-api-url'
import { getData } from '@echo/api/services/fetcher/base/get-data'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'

export function getOfferSignatureFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return getData<OfferSignatureResponse>(offerSignatureApiUrl(offerId), token)
}
