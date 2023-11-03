import { acceptOffer as firestoreAcceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { HexString } from '@echo/utils/types/hex-string'

export async function acceptOffer(offerId: string, userId: string, signature: HexString) {
  try {
    return await firestoreAcceptOffer(offerId, userId, signature)
  } catch (e) {
    throw new ServerError(`error accepting offer with id ${offerId}`, e)
  }
}
