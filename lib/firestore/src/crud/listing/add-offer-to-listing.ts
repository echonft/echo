import { Offer } from '../../types/model/offer'
import { findListingById } from './find-listing-by-id'
import { updateListing } from './update-listing'
import { WriteResult } from 'firebase-admin/firestore'

export const addOfferToListing = async (listingId: string, offer: Offer): Promise<WriteResult> => {
  const listing = await findListingById(listingId)
  return updateListing(listingId, { offers: [...listing.offers, offer] })
}
