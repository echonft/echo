import { getListingTargetsCollectionIds } from '@echo/model/helpers/listing/get-listing-targets-collection-ids'
import { getOfferItemsCollectionIds } from '@echo/model/helpers/offer/get-offer-items-collection-ids'
import { type Listing } from '@echo/model/types/listing'
import { type OfferItem } from '@echo/model/types/offer-item'
import { intersects } from '@echo/utils/fp/intersects'

export function offerItemsIncludeListingTargets(items: OfferItem[]) {
  return function (listing: Listing) {
    return intersects(getListingTargetsCollectionIds(listing), getOfferItemsCollectionIds(items))
  }
}
