import { DocumentSnapshot, QueryDocumentSnapshot } from '@google-cloud/firestore'
import { DocumentSnapshot as FirebaseDocumentSnapshot } from 'firebase/firestore'

export function convertAdminDocumentSnapshot<T>(
  snapshot: DocumentSnapshot | QueryDocumentSnapshot
): FirebaseDocumentSnapshot<T> {
  return snapshot as unknown as FirebaseDocumentSnapshot<T>
}
