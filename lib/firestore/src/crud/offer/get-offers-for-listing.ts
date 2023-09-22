import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { getListingTargetsCollectionIds } from '@echo/firestore/helpers/listing/get-listing-targets-collection-ids'
import { getOfferItemsCollectionId } from '@echo/firestore/helpers/offer/get-offer-items-collection-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isNotIn } from '@echo/utils/fp/is-not-in'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { invoker, map, path, pipe, prop, reject } from 'ramda'

export async function getOffersForListing(
  items: NonEmptyArray<FirestoreListingItem>,
  targets: NonEmptyArray<FirestoreListingTarget>
) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFERS)
    .where('receiverItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), items))
    .withConverter(offerDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreOffer[]
  }

  return pipe(
    map(invoker(0, 'data')),
    reject(pipe(prop('senderItems'), getOfferItemsCollectionId, isNotIn(getListingTargetsCollectionIds(targets))))
  )(querySnapshot.docs) as FirestoreOffer[]
}
