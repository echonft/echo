import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerPostDataConverter } from '@echo/firestore/converters/offer-post/offer-post-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getOfferPostSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFER_POSTS)
    .withConverter(offerPostDataConverter)
    .where('id', '==', id)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
