import { ApiError } from '../api-error'
import { cancelOffer as FirestoreCancelOffer } from '@echo/firestore'

export const cancelOffer = async (offerId: string) => {
  try {
    await FirestoreCancelOffer(offerId)
  } catch (e) {
    throw new ApiError(500, 'Error cancelling offer')
  }
}
