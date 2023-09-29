import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { filter, pathEq } from 'ramda'

/**
 * Returns the fulfilling status of offer items regarding listing targets
 * This is assuming both sets already intersect
 * @param {Array<FirestoreListingTarget>} targets
 * @param {Array<FirestoreOfferItem>} offerItems
 * @return {ListingOfferFulfillingStatus}
 */
export function getListingTargetsFulfillingStatus(
  targets: FirestoreListingTarget[],
  offerItems: FirestoreOfferItem[]
): ListingOfferFulfillingStatus {
  for (const target of targets) {
    const { amount, collection } = target
    const collectionId = collection.id
    if (filter(pathEq(collectionId, ['nft', 'collection', 'id']), offerItems).length >= amount) {
      return ListingOfferFulfillingStatus.COMPLETELY
    }
  }
  return ListingOfferFulfillingStatus.PARTIALLY
}
