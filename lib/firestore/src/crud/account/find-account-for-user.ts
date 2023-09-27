import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function findAccountForUser(userId: string) {
  const querySnapshot = await firestoreApp().collection(CollectionName.ACCOUNTS).where('userId', '==', userId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
