import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Session } from '@echo/firestore/types/model/session/session'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getSessionsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.SESSIONS) as CollectionReference<Session, Session>
}
