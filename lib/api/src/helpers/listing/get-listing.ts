import { ServerError } from '../error/server-error'
import { findListingById } from '@echo/firestore'

export const getListing = async (listingId: string) => {
  try {
    return await findListingById(listingId)
  } catch (e) {
    throw new ServerError('Error fetching listing')
  }
}
