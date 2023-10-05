import { getListingTargetsCollectionIds } from '@echo/firestore/helpers/listing/get-listing-targets-collection-ids'
import { getOfferItemsCollectionIds } from '@echo/firestore/helpers/offer/get-offer-items-collection-ids'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { intersects } from '@echo/utils/fp/intersects'

export function offerItemsIncludeListingTargets(items: FirestoreOfferItem[]) {
  return function (listing: FirestoreListing) {
    return intersects(getListingTargetsCollectionIds(listing), getOfferItemsCollectionIds(items))
  }
}
