import { FirestoreData } from '../../types/model/data/abstract/firestore-data'
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore'

export function convertToFirestoreData<T extends DocumentData, V extends FirestoreData = FirestoreData>(
  snapshot: DocumentSnapshot<T> | QueryDocumentSnapshot<T>
): V {
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as V
}
