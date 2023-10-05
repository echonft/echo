import { getOffersCollection } from '@echo/firestore/helpers/collection/get-offers-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { listingTargetsIncludeOfferReceiverItems } from '@echo/firestore/helpers/listing/listing-targets-include-offer-receiver-items'
import { listingTargetsIncludeOfferSenderItems } from '@echo/firestore/helpers/listing/listing-targets-include-offer-sender-items'
import { getListingOfferFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status'
import { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'
import { concat, eqProps, filter, map, path, pipe, uniqWith } from 'ramda'

async function receiverItemsMatch(listing: FirestoreListing) {
  const { items } = listing
  // get the offers for which the receiver items intersect with the listing items
  const querySnapshot = await getOffersCollection()
    .where('receiverItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), items))
    .get()

  // for these offers, check if the sender items match with listing targets
  const offers = pipe<[QuerySnapshot<FirestoreOffer>], FirestoreOffer[], FirestoreOffer[]>(
    getQuerySnapshotDocumentsData,
    filter(listingTargetsIncludeOfferSenderItems(listing))
  )(querySnapshot)

  // if any offers are found, set the fulfill status
  if (isNonEmptyArray(offers)) {
    return map(
      (offer) => ({
        listingId: listing.id,
        offerId: offer.id,
        fulfillingStatus: getListingOfferFulfillingStatus(listing, offer.senderItems, offer.receiverItems)
      }),
      offers
    ) as Omit<FirestoreListingOffer, 'id'>[]
  }
  return [] as Omit<FirestoreListingOffer, 'id'>[]
}

async function senderItemsMatch(listing: FirestoreListing) {
  const { items } = listing
  // get the offers for which the sender items intersect with the listing items
  const querySnapshot = await getOffersCollection()
    .where('senderItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), items))
    .get()

  // for these offers, check if the receiver items match with listing targets
  const offers = pipe<[QuerySnapshot<FirestoreOffer>], FirestoreOffer[], FirestoreOffer[]>(
    getQuerySnapshotDocumentsData,
    filter(listingTargetsIncludeOfferReceiverItems(listing))
  )(querySnapshot)

  // if any offers are found, set the fulfill status
  if (isNonEmptyArray(offers)) {
    return map(
      (offer) => ({
        listingId: listing.id,
        offerId: offer.id,
        fulfillingStatus: getListingOfferFulfillingStatus(listing, offer.receiverItems, offer.senderItems)
      }),
      offers
    ) as Omit<FirestoreListingOffer, 'id'>[]
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
