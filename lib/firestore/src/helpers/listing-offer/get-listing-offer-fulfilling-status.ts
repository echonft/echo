import { getListingItemsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-items-fulfilling-status'
import { getListingTargetsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-targets-fulfilling-status'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { Listing } from '@echo/model/types/listing'
import type { OfferItem } from '@echo/model/types/offer-item'

export function getListingOfferFulfillingStatus(
  listing: Listing,
  targetsFulfillingOfferItems: OfferItem[],
  itemsFulfillingOfferItems: OfferItem[]
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
