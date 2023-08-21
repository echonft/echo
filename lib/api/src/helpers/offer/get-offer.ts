import { ApiError } from '../api-error'
import { findOfferById } from '@echo/firestore'

export const getOffer = async (offerId: string) => {
  try {
    return await findOfferById(offerId)
  } catch (e) {
    throw new ApiError(401, 'Invalid offer id')
  }
}
