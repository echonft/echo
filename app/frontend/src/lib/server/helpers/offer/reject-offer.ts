import { rejectOffer as firestoreRejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { ServerError } from '@server/helpers/error/server-error'

export const rejectOffer = async (offerId: string) => {
  try {
    await firestoreRejectOffer(offerId)
  } catch (e) {
    throw new ServerError(`error rejecting offer with id ${offerId}`, e)
  }
}
