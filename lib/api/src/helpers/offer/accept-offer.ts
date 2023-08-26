import { ApiError } from '../error/api-error'
import { acceptOffer as firestoreAcceptOffer } from '@echo/firestore'

export const acceptOffer = async (offerId: string) => {
  try {
    await firestoreAcceptOffer(offerId)
  } catch (e) {
    throw new ApiError(500, 'Error accepting offer')
  }
}
