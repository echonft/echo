import { acceptOffer as firestoreAcceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { ServerError } from '@server/helpers/error/server-error'

export async function acceptOffer(offerId: string, signature: string) {
  try {
    await firestoreAcceptOffer(offerId, signature)
  } catch (e) {
    throw new ServerError(`error accepting offer with id ${offerId}`, e)
  }
}
