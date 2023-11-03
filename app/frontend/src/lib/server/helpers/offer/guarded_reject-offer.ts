import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function guarded_rejectOffer(offerId: string) {
  try {
    return await rejectOffer(offerId)
  } catch (e) {
    throw new ServerError(`error rejecting offer with id ${offerId}`, e)
  }
}
