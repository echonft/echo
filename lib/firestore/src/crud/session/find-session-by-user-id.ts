import { CollectionName } from '@echo/firestore/constants/collection-name'
import { sessionDataConverter } from '@echo/firestore/converters/session/session-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreSession } from '@echo/firestore/types/model/session/firestore-session'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findSessionByUserId(userId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.SESSIONS)
    .where('userId', '==', userId)
    .withConverter(sessionDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreSession>
  return documentSnapshot?.data()
}
