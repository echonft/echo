import { FirestoreDocumentSnapshot } from '@echo/firestore'

export const mapDocumentSnapshot = <T extends FirebaseFirestore.DocumentData>(
  snapshot: FirebaseFirestore.DocumentSnapshot<T>
): FirestoreDocumentSnapshot<T> => ({
  id: snapshot.id,
  data: snapshot.data() as T
})
