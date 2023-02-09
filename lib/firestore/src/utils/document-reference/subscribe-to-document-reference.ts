import { FirestoreDocumentPath, FirestoreDocumentSnapshot } from '../../types'
import { mapDocumentSnapshot } from '../document-snapshot/map-document-snapshot'
import { getDocRef } from './get-doc-ref'
import { DocumentData, DocumentSnapshot, onSnapshot, Unsubscribe } from 'firebase/firestore'

export const subscribeToDocumentReference = <T extends DocumentData>(
  path: FirestoreDocumentPath,
  onNext: (snapshot: FirestoreDocumentSnapshot<T>) => void
): Unsubscribe =>
  onSnapshot<T>(getDocRef<T>(path), (snapshot: DocumentSnapshot<T>) => {
    onNext(mapDocumentSnapshot(snapshot))
  })
