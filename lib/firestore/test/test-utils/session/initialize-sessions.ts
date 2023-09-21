import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { sessionDocumentDataMock } from '@echo/firestore-mocks/session/session-document-data-mock'

export async function initializeSessions() {
  const sessions = Object.values(sessionDocumentDataMock)
  for (const session of sessions) {
    await firestoreApp().collection(CollectionName.SESSIONS).doc().set(session)
  }
}
