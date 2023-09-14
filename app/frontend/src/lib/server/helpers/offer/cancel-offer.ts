import { cancelOffer as firestoreCancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { ServerError } from '@server/helpers/error/server-error'

export const cancelOffer = async (offerId: string) => {
  try {
    await firestoreCancelOffer(offerId)
  } catch (e) {
    throw new ServerError(`error cancelling offer with id ${offerId}`, e)
  }
}
