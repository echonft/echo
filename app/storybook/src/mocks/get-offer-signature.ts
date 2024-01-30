import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function getOfferSignature(_args: GetOfferSignatureArgs): Promise<OfferSignatureResponse> {
  return delayPromise(Promise.resolve({ signature: '0xwhatever' }), 1200)
}
