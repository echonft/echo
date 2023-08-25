import { Listing } from '../../types/model/listing'
import { findOfferById } from '../offer/find-offer-by-id'
import { updateListing } from './update-listing'
import { WriteResult } from 'firebase-admin/firestore'
import { includes, isNil } from 'ramda'

export const addOfferToListing = async (listing: Listing, offerId: string): Promise<WriteResult> => {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error('invalid offer id')
  }
  if (includes(offerId, listing.offersIds)) {
    throw Error('offer id already in listing')
  }
  return updateListing(listing.id, { offersIds: [...listing.offersIds, offerId] })
}
