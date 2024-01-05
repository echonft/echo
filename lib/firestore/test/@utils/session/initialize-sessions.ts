import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { sessionMock } from '@echo/firestore-mocks/session/session-mock'

export async function initializeSessions() {
  const sessions = Object.values(sessionMock)
  for (const session of sessions) {
    await firestoreApp().collection(CollectionReferenceName.SESSIONS).doc(session.id).set(session)
  }
}
