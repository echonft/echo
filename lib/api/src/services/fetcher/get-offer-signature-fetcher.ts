import { assertToken } from '@echo/api/helpers/assert-token'
import { offerSignatureApiUrl } from '@echo/api/routing/offer-signature-api-url'
import { postData } from '@echo/api/services/fetcher/base/post-data'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'

export function getOfferSignatureFetcher(offerId: string, token: string | undefined) {
  assertToken(token)
  return postData<never, OfferSignatureResponse>(offerSignatureApiUrl(offerId), undefined, token)
}
