import { ApiError } from '../error/api-error'
import { findOfferById } from '@echo/firestore'

export const getOffer = async (offerId: string) => {
  try {
    return await findOfferById(offerId)
  } catch (e) {
    throw new ApiError(500, 'Error fetching offer')
  }
}
