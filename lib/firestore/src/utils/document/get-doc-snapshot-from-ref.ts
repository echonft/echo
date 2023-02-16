import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { DocumentData, DocumentReference, getDoc } from 'firebase/firestore'

export const getDocSnapshotFromRef = <T extends DocumentData>(
  ref: DocumentReference<T>
): Promise<FirestoreSnapshot<T>> => getDoc(ref)
