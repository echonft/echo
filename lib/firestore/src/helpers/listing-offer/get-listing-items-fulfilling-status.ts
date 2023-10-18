import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { type ListingItem } from '@echo/model/types/listing-item'
import { type OfferItem } from '@echo/model/types/offer-item'
import { find, intersection, isNil, map, path, pathEq } from 'ramda'

/**
 * Returns the fulfilling status of offer items regarding listing items
 * This is assuming both sets already intersect
 * @param {ListingItem[]} listingItems
 * @param {OfferItem[]} offerItems
 * @return {ListingOfferFulfillingStatus}
 */
export function getListingItemsFulfillingStatus(
  listingItems: ListingItem[],
  offerItems: OfferItem[]
): ListingOfferFulfillingStatus {
  if (
    intersection(map(path(['nft', 'id']), listingItems), map(path(['nft', 'id']), offerItems)).length ===
    listingItems.length
  ) {
    for (const listingItem of listingItems) {
      const offerItem = find(pathEq(listingItem.nft.id, ['nft', 'id']), offerItems)
      if (isNil(offerItem) || offerItem.amount < listingItem.amount) {
        return ListingOfferFulfillingStatus.PARTIALLY
      }
    }
    return ListingOfferFulfillingStatus.COMPLETELY
  }
  return ListingOfferFulfillingStatus.PARTIALLY
}
