import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { ServerError } from '@server/helpers/error/server-error'

export async function getListing(listingId: string) {
  try {
    return await findListingById(listingId)
  } catch (e) {
    throw new ServerError(`error getting listing with id ${listingId}`, e)
  }
}
