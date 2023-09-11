import { acceptOffer as firestoreAcceptOffer } from '@echo/firestore'
import { ServerError } from '@server/helpers/error/server-error'

export const acceptOffer = async (offerId: string) => {
  try {
    await firestoreAcceptOffer(offerId)
  } catch (e) {
    throw new ServerError(`error accepting offer with id ${offerId}`, e)
  }
}
