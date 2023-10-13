import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { getListingOfferFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status'
import { offerItemsIncludeListingTargets } from '@echo/firestore/helpers/offer/offer-items-include-listing-targets'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'
import { concat, eqProps, filter, map, path, pipe, uniqWith } from 'ramda'

async function receiverItemsListingItemsMatch(offer: Offer) {
  const { receiverItems, senderItems } = offer
  // get the listings for which items intersect with the offer receiver items
  const querySnapshot = await getListingsCollectionReference()
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), receiverItems))
    .get()

  // for these listings, check if the targets match with the sender items
  const listings = pipe<[QuerySnapshot<Listing>], Listing[], Listing[]>(
    getQuerySnapshotDocumentsData,
    filter(offerItemsIncludeListingTargets(senderItems))
  )(querySnapshot)

  // if any listings are found, set the fulfill status
  if (isNonEmptyArray(listings)) {
    return map(
      (listing) => ({
        listingId: listing.id,
        offerId: offer.id,
        fulfillingStatus: getListingOfferFulfillingStatus(listing, senderItems, receiverItems)
      }),
      listings
    ) as Omit<ListingOffer, 'id'>[]
  }
  return [] as Omit<ListingOffer, 'id'>[]
}

async function senderItemsListingItemsMatch(offer: Offer) {
  const { receiverItems, senderItems } = offer
  // get the listings for which items intersect with the offer sender items
  const querySnapshot = await getListingsCollectionReference()
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), senderItems))
    .get()

  // for these listings, check if the targets match with the receiver items
  const listings = pipe<[QuerySnapshot<Listing>], Listing[], Listing[]>(
    getQuerySnapshotDocumentsData,
    filter(offerItemsIncludeListingTargets(receiverItems))
  )(querySnapshot)

  // if any listings are found, set the fulfill status
  if (isNonEmptyArray(listings)) {
    return map(
      (listing) => ({
        listingId: listing.id,
        offerId: offer.id,
        fulfillingStatus: getListingOfferFulfillingStatus(listing, receiverItems, senderItems)
      }),
      listings
    ) as Omit<ListingOffer, 'id'>[]
  }
  return [] as Omit<ListingOffer, 'id'>[]
}

export async function getListingOffersForOffer(offer: Offer) {
  const receiverItemsMatches = await receiverItemsListingItemsMatch(offer)
  const senderItemsMatches = await senderItemsListingItemsMatch(offer)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(concat, uniqWith(eqProps('listingId')))(receiverItemsMatches, senderItemsMatches) as Omit<
    ListingOffer,
    'id'
  >[]
}
