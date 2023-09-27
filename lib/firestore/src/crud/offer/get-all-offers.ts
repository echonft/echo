import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getAllOffers() {
  const querySnapshot = await firestoreApp().collection(CollectionName.OFFERS).withConverter(offerDataConverter).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
