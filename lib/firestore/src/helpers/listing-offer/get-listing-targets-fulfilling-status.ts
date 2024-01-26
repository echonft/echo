import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type OfferItem } from '@echo/model/types/offer-item'
import { filter, pathEq } from 'ramda'

/**
 * Returns the fulfilling status of offer items regarding listing targets
 * This is assuming both sets already intersect
 * @param {ListingTarget[]} targets
 * @param {OfferItem[]} offerItems
 * @return {ListingOfferFulfillingStatus}
 */
export function getListingTargetsFulfillingStatus(
  targets: ListingTarget[],
  offerItems: OfferItem[]
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
