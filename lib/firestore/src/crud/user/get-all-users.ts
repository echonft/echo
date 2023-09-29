import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDataConverter } from '@echo/firestore/converters/user/user-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getAllUsers() {
  const querySnapshot = await firestoreApp().collection(CollectionName.USERS).withConverter(userDataConverter).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
