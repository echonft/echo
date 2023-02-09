import { FirestoreDocumentSnapshot } from '../../types/utils/firestore-document-snapshot'
import { mapDocumentSnapshot } from './map-document-snapshot'
import { DocumentData, DocumentReference, getDoc } from 'firebase/firestore'

export const getDocSnapshotFromRef = <T extends DocumentData>(
  ref: DocumentReference<T>
): Promise<FirestoreDocumentSnapshot<T>> => getDoc(ref).then(mapDocumentSnapshot)
