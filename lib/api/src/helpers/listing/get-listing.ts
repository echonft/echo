import { ApiError } from '../error/api-error'
import { findListingById } from '@echo/firestore'

export const getListing = async (listingId: string) => {
  try {
    return await findListingById(listingId)
  } catch (e) {
    throw new ApiError(500, 'Error fetching listing')
  }
}
