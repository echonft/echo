import { ApiError } from '../api-error'
import { rejectOffer as FirestoreRejectOffer } from '@echo/firestore'

export const rejectOffer = async (offerId: string) => {
  try {
    await FirestoreRejectOffer(offerId)
  } catch (e) {
    throw new ApiError(500, 'Error rejecting offer')
  }
}
