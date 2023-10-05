import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function fulfillListing(listingId: string): Promise<WriteResult> {
  return await updateListingState(listingId, 'FULFILLED')
}
