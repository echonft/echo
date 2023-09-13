import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export async function getListingSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('id', '==', id)
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreListing>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
