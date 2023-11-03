import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function guarded_findListingById(listingId: string) {
  try {
    return await findListingById(listingId)
  } catch (e) {
    throw new ServerError(`error getting listing with id ${listingId}`, e)
  }
}
