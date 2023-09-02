import { findListingById } from '../listing/find-listing-by-id'
import { updateOffer } from './update-offer'
import { Offer } from '@echo/firestore-types'
import { WriteResult } from 'firebase-admin/firestore'
import { includes, isNil } from 'ramda'

export const addListingToOffer = async (offer: Offer, listingId: string): Promise<WriteResult> => {
  const listing = await findListingById(listingId)
  if (isNil(listing)) {
    throw Error('invalid listing id')
  }
  if (includes(listingId, offer.listingsIds)) {
    throw Error(`listing ${listingId} already in offer`)
  }
  return updateOffer(offer.id, { listingsIds: [...offer.listingsIds, listingId] })
}
