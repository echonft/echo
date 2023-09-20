import { CollectionName } from '@echo/firestore/constants/collection-name'
import { sessionDataConverter } from '@echo/firestore/converters/session-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreSession } from '@echo/firestore/types/model/firestore-session'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findSessionByToken(token: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.SESSIONS)
    .where('sessionToken', '==', token)
    .withConverter(sessionDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreSession>
  return documentSnapshot?.data()
}
