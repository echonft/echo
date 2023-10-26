import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { type WriteResult } from 'firebase-admin/firestore'

export async function cancelListing(listingId: string): Promise<WriteResult> {
  return await updateListingState(listingId, 'CANCELLED')
}
