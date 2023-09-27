import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDataConverter } from '@echo/firestore/converters/user/user-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getUserSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.USERS)
    .where('id', '==', id)
    .withConverter(userDataConverter)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
