import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ServerError } from '@server/helpers/error/server-error'

export const getOffer = async (offerId: string) => {
  try {
    return await findOfferById(offerId)
  } catch (e) {
    throw new ServerError(`error getting offer with id ${offerId}`, e)
  }
}
