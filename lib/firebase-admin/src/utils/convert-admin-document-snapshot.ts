import { DocumentSnapshot as FirebaseDocumentSnapshot } from 'firebase/firestore'
import { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase-admin/firestore'

export function convertAdminDocumentSnapshot<T>(
  snapshot: DocumentSnapshot | QueryDocumentSnapshot
): FirebaseDocumentSnapshot<T> {
  return snapshot as unknown as FirebaseDocumentSnapshot<T>
}
