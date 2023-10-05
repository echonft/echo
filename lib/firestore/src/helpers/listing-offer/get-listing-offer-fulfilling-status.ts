import { getListingItemsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-items-fulfilling-status'
import { getListingTargetsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-targets-fulfilling-status'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'

export function getListingOfferFulfillingStatus(
  listing: FirestoreListing,
  targetsFulfillingOfferItems: FirestoreOfferItem[],
  itemsFulfillingOfferItems: FirestoreOfferItem[]
) {
  const { items, targets } = listing
  const targetsFulfillingStatus = getListingTargetsFulfillingStatus(targets, targetsFulfillingOfferItems)
  const itemsFulfillingStatus = getListingItemsFulfillingStatus(items, itemsFulfillingOfferItems)
  if (
    itemsFulfillingStatus === ListingOfferFulfillingStatus.COMPLETELY &&
    targetsFulfillingStatus === ListingOfferFulfillingStatus.COMPLETELY
  ) {
    return ListingOfferFulfillingStatus.COMPLETELY
  }
  return ListingOfferFulfillingStatus.PARTIALLY
}
