import { CollectionName } from '@echo/firestore/constants/collection-name'
import { sessionDataConverter } from '@echo/firestore/converters/session/session-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreSession } from '@echo/firestore/types/model/session/firestore-session'
import { invoker, map } from 'ramda'

export async function getAllSessions() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.SESSIONS)
    .withConverter(sessionDataConverter)
    .get()
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreSession[]
}
