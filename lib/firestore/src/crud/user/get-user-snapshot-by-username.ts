import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDataConverter } from '@echo/firestore/converters/user/user-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getUserSnapshotByUsername(username: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.USERS)
    .where('name', '==', username)
    .withConverter(userDataConverter)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
