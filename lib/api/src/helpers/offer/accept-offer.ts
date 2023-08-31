import { ServerError } from '../error/server-error'
import { acceptOffer as firestoreAcceptOffer } from '@echo/firestore'

export const acceptOffer = async (offerId: string) => {
  try {
    await firestoreAcceptOffer(offerId)
  } catch (e) {
    throw new ServerError('Error accepting offer')
  }
}
