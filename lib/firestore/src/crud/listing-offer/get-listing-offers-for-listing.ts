import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { getListingTargetsCollectionIds } from '@echo/firestore/helpers/listing/get-listing-targets-collection-ids'
import { getListingItemsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-items-fulfilling-status'
import { getListingTargetsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-targets-fulfilling-status'
import { getOfferItemsCollectionIds } from '@echo/firestore/helpers/offer/get-offer-items-collection-ids'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { intersects } from '@echo/utils/fp/intersects'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { always, concat, converge, eqProps, filter, invoker, map, path, pipe, prop, uniqWith } from 'ramda'

async function receiverItemsMatch(listing: FirestoreListing) {
  const { items, targets } = listing
  // get the offers for which the receiver items intersect with the listing items
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFERS)
    .where('receiverItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), items))
    .withConverter(offerDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as Omit<FirestoreListingOffer, 'id'>[]
  }

  // for these offers, check if the sender items match with listing targets
  const offers = pipe(
    map(invoker(0, 'data')),
    filter(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      converge(intersects, [
        pipe(prop('senderItems'), getOfferItemsCollectionIds),
        always(getListingTargetsCollectionIds(listing))
      ])
    )
  )(querySnapshot.docs) as FirestoreOffer[]

  // if any offers are found, set the fulfill status
  if (isNonEmptyArray(offers)) {
    return map((offer) => {
      const { receiverItems, senderItems } = offer
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
    }, offers) as Omit<FirestoreListingOffer, 'id'>[]
  }
  return [] as Omit<FirestoreListingOffer, 'id'>[]
}

async function senderItemsMatch(listing: FirestoreListing) {
  const { items, targets } = listing
  // get the offers for which the sender items intersect with the listing items
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFERS)
    .where('senderItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), items))
    .withConverter(offerDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as Omit<FirestoreListingOffer, 'id'>[]
  }

  // for these offers, check if the receiver items match with listing targets
  const offers = pipe(
    map(invoker(0, 'data')),
    filter(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      converge(intersects, [
        pipe(prop('receiverItems'), getOfferItemsCollectionIds),
        always(getListingTargetsCollectionIds(listing))
      ])
    )
  )(querySnapshot.docs) as FirestoreOffer[]

  // if any offers are found, set the fulfill status
  if (isNonEmptyArray(offers)) {
    return map((offer) => {
      const { receiverItems, senderItems } = offer
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
    }, offers) as Omit<FirestoreListingOffer, 'id'>[]
  }
  return [] as Omit<FirestoreListingOffer, 'id'>[]
}

export async function getListingOffersForListing(listing: FirestoreListing) {
  const receiverItemsMatches = await receiverItemsMatch(listing)
  const senderItemsMatches = await senderItemsMatch(listing)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(concat, uniqWith(eqProps('offerId')))(receiverItemsMatches, senderItemsMatches) as Omit<
    FirestoreListingOffer,
    'id'
  >[]
}
