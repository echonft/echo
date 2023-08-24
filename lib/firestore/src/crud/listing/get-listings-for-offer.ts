import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { getOfferItemsCollectionId } from '../../helpers/offer/get-offer-items-collection-id'
import { listingTargetCollectionEquals } from '../../predicates/listing-target-collection-equals'
import { Listing } from '../../types/model/listing'
import { OfferItem } from '../../types/model/offer-item'
import { NonEmptyArray } from '@echo/utils'
import { firestore } from 'firebase-admin'
import { invoker, map, none, pipe, prop, reject } from 'ramda'

export const getListingsForOffer = async (
  senderItems: NonEmptyArray<OfferItem>,
  receiverItems: NonEmptyArray<OfferItem>
) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.LISTINGS)
    .where('itemsIds', 'array-contains-any', map(prop('id'), receiverItems))
    // cannot have 2 array-contains in a query :(
    // .where('targetsIds', 'array-contains', getOfferItemsCollectionId(senderItems))
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Listing[]
  }

  return pipe(
    map(invoker(0, 'data')),
    reject(pipe(prop('targets'), none(listingTargetCollectionEquals(getOfferItemsCollectionId(senderItems)))))
  )(querySnapshot.docs) as Listing[]
}
