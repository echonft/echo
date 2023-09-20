import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getListingsWithOfferId(offerId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('offersIds', 'array-contains', offerId)
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreListing[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreListing[]
}
