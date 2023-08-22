import { ApiError } from '../api-error'
import { rejectOffer as firestoreRejectOffer } from '@echo/firestore'

export const rejectOffer = async (offerId: string) => {
  try {
    await firestoreRejectOffer(offerId)
  } catch (e) {
    throw new ApiError(500, 'Error rejecting offer')
  }
}
