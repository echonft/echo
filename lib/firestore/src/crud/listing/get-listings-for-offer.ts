import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { getOfferItemsCollectionId } from '../../helpers/offer/get-offer-items-collection-id'
import { firestore } from '../../services/firestore'
import { Listing, OfferItem } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'
import { invoker, map, none, path, pathEq, pipe, prop, reject } from 'ramda'

export const getListingsForOffer = async (
  senderItems: NonEmptyArray<OfferItem>,
  receiverItems: NonEmptyArray<OfferItem>
) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.LISTINGS)
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), receiverItems))
    // cannot have 2 array-contains in a query :(
    // .where('targetsIds', 'array-contains', getOfferItemsCollectionId(senderItems))
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Listing[]
  }

  return pipe(
    map(invoker(0, 'data')),
    reject(pipe(prop('targets'), none(pathEq(getOfferItemsCollectionId(senderItems), ['collection', 'id']))))
  )(querySnapshot.docs) as Listing[]
}
