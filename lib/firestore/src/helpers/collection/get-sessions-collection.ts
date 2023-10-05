import { CollectionName } from '@echo/firestore/constants/collection-name'
import { sessionDataConverter } from '@echo/firestore/converters/session/session-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getSessionsCollection() {
  return firestoreApp().collection(CollectionName.SESSIONS).withConverter(sessionDataConverter)
}
