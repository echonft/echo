import { ApiError } from '../api-error'
import { cancelListing as firestoreCancelListing } from '@echo/firestore'

export const cancelListing = async (listingId: string) => {
  try {
    await firestoreCancelListing(listingId)
  } catch (e) {
    throw new ApiError(500, 'Error cancelling listing')
  }
}
