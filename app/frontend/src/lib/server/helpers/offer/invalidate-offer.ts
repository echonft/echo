import { ServerError } from '../error/server-error'
import { invalidateOffer as firestoreInvalidateOffer } from '@echo/firestore'

export const invalidateOffer = async (offerId: string) => {
  try {
    await firestoreInvalidateOffer(offerId)
  } catch (e) {
    throw new ServerError('Error invalidating offer')
  }
}
