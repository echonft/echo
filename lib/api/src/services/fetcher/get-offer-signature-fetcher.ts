import { assertToken } from '@echo/api/helpers/assert-token'
import { offerSignatureApiUrl } from '@echo/api/routing/offer-signature-api-url'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { getData } from '@echo/utils/services/get-data'

export function getOfferSignatureFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return getData<undefined, OfferSignatureResponse>(offerSignatureApiUrl(offerId), undefined, token)
}
