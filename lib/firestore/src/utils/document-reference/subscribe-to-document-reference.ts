import { FirestoreDocumentSnapshot } from '../../types'
import { mapDocumentSnapshot } from '../document-snapshot/map-document-snapshot'
import { getDocRef } from './get-doc-ref'
import { DocumentData, DocumentSnapshot, onSnapshot, Unsubscribe } from 'firebase/firestore'

export const subscribeToDocumentReference = <T extends DocumentData>(
  onNext: (snapshot: FirestoreDocumentSnapshot<T>) => void,
  path: string,
  ...pathSegments: string[]
): Unsubscribe =>
  onSnapshot<T>(getDocRef<T>(path, ...pathSegments), (snapshot: DocumentSnapshot<T>) => {
    onNext(mapDocumentSnapshot(snapshot))
  })
