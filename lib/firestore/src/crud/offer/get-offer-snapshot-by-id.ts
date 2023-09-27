import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getOfferSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFERS)
    .where('id', '==', id)
    .withConverter(offerDataConverter)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
