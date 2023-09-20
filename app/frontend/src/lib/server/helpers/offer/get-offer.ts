import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ServerError } from '@server/helpers/error/server-error'

export async function getOffer(offerId: string) {
  try {
    return await findOfferById(offerId)
  } catch (e) {
    throw new ServerError(`error getting offer with id ${offerId}`, e)
  }
}
