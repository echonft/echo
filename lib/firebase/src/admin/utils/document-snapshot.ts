import { DocumentSnapshot } from '@google-cloud/firestore'
import { DocumentSnapshot as FirebaseDocumentSnapshot } from 'firebase/firestore'

export function convertDocumentSnapshotToFirebase<T>(snapshot: DocumentSnapshot): FirebaseDocumentSnapshot<T> {
  return snapshot as unknown as FirebaseDocumentSnapshot<T>
}
