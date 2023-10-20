import { acceptOffer as firestoreAcceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import type { HexString } from '@echo/utils/types/hex-string'
import { ServerError } from '@server/helpers/error/server-error'

export async function acceptOffer(offerId: string, userId: string, signature: HexString) {
  try {
    await firestoreAcceptOffer(offerId, userId, signature)
  } catch (e) {
    throw new ServerError(`error accepting offer with id ${offerId}`, e)
  }
}
