import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueriesSnapshots } from '@echo/firestore/helpers/crud/query/get-queries-snapshots'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { getListingOfferFulfillingStatusForListing } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status-for-listing'
import { listingOffersEq } from '@echo/firestore/helpers/listing-offer/listing-offers-eq'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { NOT_READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import { mapNftsToNftIndexes } from '@echo/model/helpers/nft/map-nfts-to-nft-indexes'
import { type Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { always, andThen, applySpec, invoker, isNil, juxt, map, pipe, prop, propEq, reject, uniqWith } from 'ramda'

export async function getListingOffersForOffer(offer: Offer): Promise<ListingOffer[]> {
  const offerSnapshot = await getOfferSnapshot(offer.slug)
  if (isNil(offerSnapshot)) {
    throw Error(`offer with slug ${offer.slug} does not exist`)
  }
  // get pending listings for which targets intersect the offer sender items and items intersect the offer receiver items
  // then filter out the ones for which the offer does not fill the listing
  return pipe(
    getListingsCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryWhere('state', 'in', NOT_READ_ONLY_LISTING_STATES),
    juxt([
      queryWhere('target.collection.slug', 'in', getNftsCollectionSlugs(offer.senderItems)),
      queryWhere('itemIndexes', 'array-contains-any', mapNftsToNftIndexes(offer.receiverItems))
    ]),
    getQueriesSnapshots,
    andThen(
      pipe(
        map(
          applySpec<ListingOffer>({
            listingId: prop('id'),
            offerId: always(offerSnapshot.id),
            fulfillingStatus: pipe(invoker(0, 'data'), getListingOfferFulfillingStatusForListing(offer))
          })
        ),
        reject(propEq(ListingOfferFulfillingStatus.NONE, 'fulfillingStatus')),
        uniqWith(listingOffersEq)
      )
    )
  )()
}
