import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function guarded_cancelOffer(offerId: string) {
  try {
    return await cancelOffer(offerId)
  } catch (e) {
    throw new ServerError(`error cancelling offer with id ${offerId}`, e)
  }
}
