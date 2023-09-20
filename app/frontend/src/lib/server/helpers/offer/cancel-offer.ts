import { cancelOffer as firestoreCancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { ServerError } from '@server/helpers/error/server-error'

export async function cancelOffer(offerId: string) {
  try {
    await firestoreCancelOffer(offerId)
  } catch (e) {
    throw new ServerError(`error cancelling offer with id ${offerId}`, e)
  }
}
