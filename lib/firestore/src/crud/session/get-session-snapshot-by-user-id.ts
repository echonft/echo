import { CollectionName } from '@echo/firestore/constants/collection-name'
import { sessionDataConverter } from '@echo/firestore/converters/session-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreSession } from '@echo/firestore/types/model/firestore-session'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export async function getSessionSnapshotByUserId(userId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.SESSIONS)
    .where('userId', '==', userId)
    .withConverter(sessionDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreSession>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
