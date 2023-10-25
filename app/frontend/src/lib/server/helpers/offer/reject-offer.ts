import { rejectOffer as firestoreRejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function rejectOffer(offerId: string) {
  try {
    await firestoreRejectOffer(offerId)
  } catch (e) {
    throw new ServerError(`error rejecting offer with id ${offerId}`, e)
  }
}
