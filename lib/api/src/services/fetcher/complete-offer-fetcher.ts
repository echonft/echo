import { assertToken } from '@echo/api/helpers/assert-token'
import { assertTransactionId } from '@echo/api/helpers/assert-transaction-id'
import { completeOfferApiUrl } from '@echo/api/routing/complete-offer-api-url'
import { postData } from '@echo/api/services/fetcher/base/post-data'
import type { CompleteOfferRequest } from '@echo/api/types/requests/complete-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { HexString } from '@echo/utils/types/hex-string'

export function completeOfferFetcher(offerId: string, transactionId: HexString | undefined, token: string | undefined) {
  assertToken(token)
  assertTransactionId(transactionId)
  return postData<CompleteOfferRequest, OfferResponse>(completeOfferApiUrl(offerId), { transactionId }, token)
}
