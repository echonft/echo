import { FirestoreDocumentSnapshot } from '../../types'
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore'

export const mapDocumentSnapshot = <T extends DocumentData>(
  snapshot: DocumentSnapshot<T> | QueryDocumentSnapshot<T>
): FirestoreDocumentSnapshot<T> => ({
  id: snapshot.id,
  data: snapshot.data() as T
})
