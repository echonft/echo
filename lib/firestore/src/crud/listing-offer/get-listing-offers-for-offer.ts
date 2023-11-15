import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import { getListingOfferFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { LISTING_STATE_CANCELLED, LISTING_STATE_FULFILLED } from '@echo/model/constants/listing-states'
import { offerItemsIncludeListingTargets } from '@echo/model/helpers/offer/offer-items-include-listing-targets'
import { type Listing } from '@echo/model/types/listing'
import { type Offer } from '@echo/model/types/offer'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { isNotIn } from '@echo/utils/fp/is-not-in'
import { now } from '@echo/utils/helpers/now'
import { QuerySnapshot } from 'firebase-admin/firestore'
import { concat, eqProps, filter, map, path, pipe, prop, uniqWith } from 'ramda'

async function receiverItemsListingItemsMatch(offer: Offer) {
  const { receiverItems, senderItems } = offer
  // get the listings for which items intersect with the offer receiver items
  const querySnapshot = await getListingsCollectionReference()
    .where('expiresAt', '>', now())
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), receiverItems))
    .get()

  // for these listings, check if the state is not LISTING_STATE_FULFILLED or LISTING_STATE_CANCELLED and if the targets match with the sender items
  const listings = pipe<[QuerySnapshot<Listing>], Listing[], Listing[], Listing[]>(
    getQuerySnapshotDocumentsData,
    filter(pipe(prop('state'), isNotIn([LISTING_STATE_FULFILLED, LISTING_STATE_CANCELLED]))),
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
    .where('expiresAt', '>', now())
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), senderItems))
    .get()

  // for these listings, check if the state is not LISTING_STATE_FULFILLED or LISTING_STATE_CANCELLED and if the targets match with the receiver items
  const listings = pipe<[QuerySnapshot<Listing>], Listing[], Listing[], Listing[]>(
    getQuerySnapshotDocumentsData,
    filter(pipe(prop('state'), isNotIn([LISTING_STATE_FULFILLED, LISTING_STATE_CANCELLED]))),
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
