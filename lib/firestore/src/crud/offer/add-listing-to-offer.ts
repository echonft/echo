import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import type { WriteResult } from 'firebase-admin/firestore'
import { includes, isNil } from 'ramda'

export async function addListingToOffer(offer: FirestoreOffer, listingId: string): Promise<WriteResult> {
  const listing = await findListingById(listingId)
  if (isNil(listing)) {
    throw Error('invalid listing id')
  }
  if (includes(listingId, offer.listingsIds)) {
    throw Error(`listing ${listingId} already in offer`)
  }
  return updateOffer(offer.id, { listingsIds: [...offer.listingsIds, listingId] })
}
