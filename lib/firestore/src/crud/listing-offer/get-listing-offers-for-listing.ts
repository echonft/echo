import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import { getListingOfferFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { listingTargetsIncludeOfferReceiverItems } from '@echo/model/helpers/listing/listing-targets-include-offer-receiver-items'
import { listingTargetsIncludeOfferSenderItems } from '@echo/model/helpers/listing/listing-targets-include-offer-sender-items'
import { type Listing } from '@echo/model/types/listing'
import { type Offer } from '@echo/model/types/offer'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { now } from '@echo/utils/helpers/now'
import { QuerySnapshot } from 'firebase-admin/firestore'
import { concat, eqProps, filter, map, path, pipe, uniqWith } from 'ramda'

async function receiverItemsMatch(listing: Listing) {
  const { items } = listing
  // get the offers for which the receiver items intersect with the listing items
  const querySnapshot = await getOffersCollectionReference()
    .where('state', '==', OFFER_STATE_OPEN)
    .where('expiresAt', '>', now())
    .where('receiverItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), items))
    .get()

  // for these offers, check if the sender items match with listing targets
  const offers = pipe<[QuerySnapshot<Offer>], Offer[], Offer[]>(
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
    ) as Omit<ListingOffer, 'id'>[]
  }
  return [] as Omit<ListingOffer, 'id'>[]
}

async function senderItemsMatch(listing: Listing) {
  const { items } = listing
  // get the offers for which the sender items intersect with the listing items
  const querySnapshot = await getOffersCollectionReference()
    .where('state', '==', OFFER_STATE_OPEN)
    .where('expiresAt', '>', now())
    .where('senderItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), items))
    .get()

  // for these offers, check if the receiver items match with listing targets
  const offers = pipe<[QuerySnapshot<Offer>], Offer[], Offer[]>(
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
    ) as Omit<ListingOffer, 'id'>[]
  }
  return [] as Omit<ListingOffer, 'id'>[]
}

export async function getListingOffersForListing(listing: Listing) {
  const receiverItemsMatches = await receiverItemsMatch(listing)
  const senderItemsMatches = await senderItemsMatch(listing)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(concat, uniqWith(eqProps('offerId')))(receiverItemsMatches, senderItemsMatches) as Omit<
    ListingOffer,
    'id'
  >[]
}
