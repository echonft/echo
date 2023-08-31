import { ServerError } from '../error/server-error'
import { findOfferById } from '@echo/firestore'

export const getOffer = async (offerId: string) => {
  try {
    return await findOfferById(offerId)
  } catch (e) {
    throw new ServerError('Error fetching offer')
  }
}
