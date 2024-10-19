import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueriesSnapshots } from '@echo/firestore/helpers/crud/query/get-queries-snapshots'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { eqListingOffers } from '@echo/firestore/helpers/listing-offer/eq-listing-offers'
import { getListingOfferFulfillingStatusForListing } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status-for-listing'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import { type Offer } from '@echo/model/types/offer/offer'
import { always, andThen, applySpec, invoker, isNil, juxt, map, pipe, prop, propEq, reject, uniqWith } from 'ramda'

export async function getListingOffersForOffer(offer: Offer): Promise<ListingOfferDocumentData[]> {
  const offerSnapshot = await getOfferSnapshot(offer.slug)
  if (isNil(offerSnapshot)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  // get pending listings for which targets intersect the offer sender items and items intersect the offer receiver items
  // then filter out the ones for which the offer does not fill the listing
  const offerSenderItemsCollectionArrayIndexer = pipe(prop('senderItems'), nftItems, itemsCollectionArrayIndexer)(offer)
  const offerReceiverItemsNftArrayIndexer = pipe(prop('receiverItems'), nftItems, itemsNftArrayIndexer)(offer)
  return pipe(
    getListingsCollectionReference,
    queryWhere('locked', '==', false),
    juxt([
      queryWhere('target.collection.slug', 'in', offerSenderItemsCollectionArrayIndexer),
      queryWhere('itemIndexes', 'array-contains-any', offerReceiverItemsNftArrayIndexer)
    ]),
    getQueriesSnapshots,
    andThen(
      pipe(
        map(
          applySpec<ListingOfferDocumentData>({
            listingId: prop('id'),
            offerId: always(offerSnapshot.id),
            fulfillingStatus: pipe(invoker(0, 'data'), getListingOfferFulfillingStatusForListing(offer))
          })
        ),
        reject(propEq(ListingOfferFulfillingStatus.None, 'fulfillingStatus')),
        uniqWith(eqListingOffers)
      )
    )
  )()
}
