import { ApiError } from '../api-error'
import { invalidateOffer as FirestoreInvalidateOffer } from '@echo/firestore'

export const invalidateOffer = async (offerId: string) => {
  try {
    await FirestoreInvalidateOffer(offerId)
  } catch (e) {
    throw new ApiError(500, 'Error invalidating offer')
  }
}
