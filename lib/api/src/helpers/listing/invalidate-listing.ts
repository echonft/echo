import { ServerError } from '../error/server-error'
import { cancelListing as firestoreCancelListing } from '@echo/firestore'

export const cancelListing = async (listingId: string) => {
  try {
    await firestoreCancelListing(listingId)
  } catch (e) {
    throw new ServerError('Error cancelling listing')
  }
}
