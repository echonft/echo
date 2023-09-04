import { ServerError } from '../error/server-error'
import { rejectOffer as firestoreRejectOffer } from '@echo/firestore'

export const rejectOffer = async (offerId: string) => {
  try {
    await firestoreRejectOffer(offerId)
  } catch (e) {
    throw new ServerError('Error rejecting offer')
  }
}
