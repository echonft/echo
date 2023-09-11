import { cancelListing as firestoreCancelListing } from '@echo/firestore'
import { ServerError } from '@server/helpers/error/server-error'

export const cancelListing = async (listingId: string) => {
  try {
    await firestoreCancelListing(listingId)
  } catch (e) {
    throw new ServerError(`error cancelling listing with id ${listingId}`, e)
  }
}
