import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { getOfferItemsCollectionId } from '@echo/firestore/helpers/offer/get-offer-items-collection-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { invoker, map, none, path, pathEq, pipe, prop, reject } from 'ramda'

export async function getListingsForOffer(
  senderItems: NonEmptyArray<FirestoreOfferItem>,
  receiverItems: NonEmptyArray<FirestoreOfferItem>
) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), receiverItems))
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreListing[]
  }

  return pipe(
    map(invoker(0, 'data')),
    reject(pipe(prop('targets'), none(pathEq(getOfferItemsCollectionId(senderItems), ['collection', 'id']))))
  )(querySnapshot.docs) as FirestoreListing[]
}
