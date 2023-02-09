import { FirestoreDocumentSnapshot } from '../../types'
import { mapDocumentSnapshot } from '../document-snapshot/map-document-snapshot'
import { DocumentData, QuerySnapshot } from 'firebase/firestore'

export const querySnapshotDocs = <T extends DocumentData>(
  snapshot: QuerySnapshot<T>
): Array<FirestoreDocumentSnapshot<T>> => snapshot.docs.map(mapDocumentSnapshot)
