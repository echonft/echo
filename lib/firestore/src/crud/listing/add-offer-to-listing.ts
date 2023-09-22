import { updateListing } from '@echo/firestore/crud/listing/update-listing'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { includes, isNil } from 'ramda'

export async function addOfferToListing(listing: FirestoreListing, offerId: string): Promise<WriteResult> {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error('invalid offer id')
  }
  if (includes(offerId, listing.offersIds)) {
    throw Error('offer id already in listing')
  }
  return updateListing(listing.id, { offersIds: [...listing.offersIds, offerId] })
}
