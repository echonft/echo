import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { getListingOfferFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status'
import { offerItemsIncludeListingTargets } from '@echo/firestore/helpers/offer/offer-items-include-listing-targets'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'
import { concat, eqProps, filter, map, path, pipe, uniqWith } from 'ramda'

async function receiverItemsListingItemsMatch(offer: FirestoreOffer) {
  const { receiverItems, senderItems } = offer
  // get the listings for which items intersect with the offer receiver items
  const querySnapshot = await getListingsCollection()
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), receiverItems))
    .get()

  // for these listings, check if the targets match with the sender items
  const listings = pipe<[QuerySnapshot<FirestoreListing>], FirestoreListing[], FirestoreListing[]>(
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
    ) as Omit<FirestoreListingOffer, 'id'>[]
  }
  return [] as Omit<FirestoreListingOffer, 'id'>[]
}

async function senderItemsListingItemsMatch(offer: FirestoreOffer) {
  const { receiverItems, senderItems } = offer
  // get the listings for which items intersect with the offer sender items
  const querySnapshot = await getListingsCollection()
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), senderItems))
    .get()

  // for these listings, check if the targets match with the receiver items
  const listings = pipe<[QuerySnapshot<FirestoreListing>], FirestoreListing[], FirestoreListing[]>(
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
    ) as Omit<FirestoreListingOffer, 'id'>[]
  }
  return [] as Omit<FirestoreListingOffer, 'id'>[]
}

export async function getListingOffersForOffer(offer: FirestoreOffer) {
  const receiverItemsMatches = await receiverItemsListingItemsMatch(offer)
  const senderItemsMatches = await senderItemsListingItemsMatch(offer)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(concat, uniqWith(eqProps('listingId')))(receiverItemsMatches, senderItemsMatches) as Omit<
    FirestoreListingOffer,
    'id'
  >[]
}
