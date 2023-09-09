import { ServerError } from '../error/server-error'
import { cancelOffer as firestoreCancelOffer } from '@echo/firestore'

export const cancelOffer = async (offerId: string) => {
  try {
    await firestoreCancelOffer(offerId)
  } catch (e) {
    throw new ServerError(`error cancelling offer with id ${offerId}`, e)
  }
}
