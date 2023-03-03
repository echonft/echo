import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { getDocRefFromPath } from './get-doc-ref-from-path'
import { DocumentData, DocumentSnapshot, onSnapshot, Unsubscribe } from 'firebase/firestore'

export const subscribeToDocument = <T extends DocumentData>(
  _onNext: (snapshot: FirestoreSnapshot<T>) => void,
  path: string,
  ...pathSegments: string[]
): Unsubscribe =>
  onSnapshot<T>(getDocRefFromPath<T>(path, ...pathSegments), (snapshot: DocumentSnapshot<T>) => {
    //FIXME
    // onNext(convertDocumentSnapshot(snapshot))
    snapshot.ref.path
  })
