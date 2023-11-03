import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { HexString } from '@echo/utils/types/hex-string'

export async function guarded_completeOffer(offerId: string, transactionId: HexString) {
  try {
    return await completeOffer(offerId, transactionId)
  } catch (e) {
    throw new ServerError(`error completing offer with id ${offerId}`, e)
  }
}
