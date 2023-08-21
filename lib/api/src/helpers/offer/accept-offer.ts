import { ApiError } from '../api-error'
import { acceptOffer as FirestoreAcceptOffer } from '@echo/firestore'

export const acceptOffer = async (offerId: string) => {
  try {
    await FirestoreAcceptOffer(offerId)
  } catch (e) {
    throw new ApiError(500, 'Error accepting offer')
  }
}
