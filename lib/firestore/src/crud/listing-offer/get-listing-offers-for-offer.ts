import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { getListingTargetsCollectionIds } from '@echo/firestore/helpers/listing/get-listing-targets-collection-ids'
import { getListingItemsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-items-fulfilling-status'
import { getListingTargetsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-targets-fulfilling-status'
import { getOfferItemsCollectionIds } from '@echo/firestore/helpers/offer/get-offer-items-collection-ids'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { intersects } from '@echo/utils/fp/intersects'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { concat, eqProps, filter, invoker, map, path, pipe, uniqWith } from 'ramda'

async function receiverItemsListingItemsMatch(offer: FirestoreOffer) {
  const { receiverItems, senderItems } = offer
  // get the listings for which items intersect with the offer receiver items
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), receiverItems))
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as Omit<FirestoreListingOffer, 'id'>[]
  }

  // for these listings, check if the targets match with the sender items
  const listings = pipe(
    map(invoker(0, 'data')),
    filter(pipe(getListingTargetsCollectionIds, intersects(getOfferItemsCollectionIds(senderItems))))
  )(querySnapshot.docs) as FirestoreListing[]

  // if any listings are found, set the fulfill status
  if (isNonEmptyArray(listings)) {
    return map((listing) => {
      const { items, targets } = listing
      const itemsFulfillingStatus = getListingItemsFulfillingStatus(items, receiverItems)
      const targetsFulfillingStatus = getListingTargetsFulfillingStatus(targets, senderItems)
      const fulfillingStatus =
        itemsFulfillingStatus === ListingOfferFulfillingStatus.COMPLETELY &&
        targetsFulfillingStatus === ListingOfferFulfillingStatus.COMPLETELY
          ? ListingOfferFulfillingStatus.COMPLETELY
          : ListingOfferFulfillingStatus.PARTIALLY
      return {
        listingId: listing.id,
        offerId: offer.id,
        fulfillingStatus
      }
    }, listings) as Omit<FirestoreListingOffer, 'id'>[]
  }
  return [] as Omit<FirestoreListingOffer, 'id'>[]
}

async function senderItemsListingItemsMatch(offer: FirestoreOffer) {
  const { receiverItems, senderItems } = offer
  // get the listings for which items intersect with the offer sender items
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), senderItems))
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as Omit<FirestoreListingOffer, 'id'>[]
  }

  // for these listings, check if the targets match with the receiver items
  const listings = pipe(
    map(invoker(0, 'data')),
    filter(pipe(getListingTargetsCollectionIds, intersects(getOfferItemsCollectionIds(receiverItems))))
  )(querySnapshot.docs) as FirestoreListing[]

  // if any listings are found, set the fulfill status
  if (isNonEmptyArray(listings)) {
    return map((listing) => {
      const { items, targets } = listing
      const itemsFulfillingStatus = getListingItemsFulfillingStatus(items, senderItems)
      const targetsFulfillingStatus = getListingTargetsFulfillingStatus(targets, receiverItems)
      const fulfillingStatus =
        itemsFulfillingStatus === ListingOfferFulfillingStatus.COMPLETELY &&
        targetsFulfillingStatus === ListingOfferFulfillingStatus.COMPLETELY
          ? ListingOfferFulfillingStatus.COMPLETELY
          : ListingOfferFulfillingStatus.PARTIALLY
      return {
        listingId: listing.id,
        offerId: offer.id,
        fulfillingStatus
      }
    }, listings) as Omit<FirestoreListingOffer, 'id'>[]
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
