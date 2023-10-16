import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { sessionDataConverter } from '@echo/firestore/converters/session/session-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getSessionsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.SESSIONS).withConverter(sessionDataConverter)
}
