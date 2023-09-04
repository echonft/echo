import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { getListingTargetsCollectionIds } from '../../helpers/listing/get-listing-targets-collection-ids'
import { getOfferItemsCollectionId } from '../../helpers/offer/get-offer-items-collection-id'
import { firestore } from '../../services/firestore'
import { ListingItem, ListingTarget, Offer } from '@echo/firestore-types'
import { isNotIn, NonEmptyArray } from '@echo/utils'
import { invoker, map, path, pipe, prop, reject } from 'ramda'

export const getOffersForListing = async (items: NonEmptyArray<ListingItem>, targets: NonEmptyArray<ListingTarget>) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.OFFERS)
    .where('receiverItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), items))
    .withConverter(offerDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Offer[]
  }

  return pipe(
    map(invoker(0, 'data')),
    reject(pipe(prop('senderItems'), getOfferItemsCollectionId, isNotIn(getListingTargetsCollectionIds(targets))))
  )(querySnapshot.docs) as Offer[]
}
