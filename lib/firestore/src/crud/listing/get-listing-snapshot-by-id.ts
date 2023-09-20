import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getListingSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('id', '==', id)
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreListing>
}
