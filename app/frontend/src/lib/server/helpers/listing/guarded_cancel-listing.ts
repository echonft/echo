import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function guarded_cancelListing(listingId: string) {
  try {
    return await cancelListing(listingId)
  } catch (e) {
    throw new ServerError(`error cancelling listing with id ${listingId}`, e)
  }
}
