import { findOfferById } from '@echo/firestore'
import { ServerError } from '@server/helpers/error/server-error'

export const getOffer = async (offerId: string) => {
  try {
    return await findOfferById(offerId)
  } catch (e) {
    throw new ServerError(`error getting offer with id ${offerId}`, e)
  }
}
