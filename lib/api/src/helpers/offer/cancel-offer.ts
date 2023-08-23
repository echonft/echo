import { ApiError } from '../error/api-error'
import { cancelOffer as firestoreCancelOffer } from '@echo/firestore'

export const cancelOffer = async (offerId: string) => {
  try {
    await firestoreCancelOffer(offerId)
  } catch (e) {
    throw new ApiError(500, 'Error cancelling offer')
  }
}
