import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreData } from '../../types/model/data/abstract/firestore-data'
import { DocumentData } from 'firebase/firestore'

export function convertToFirestoreData<T extends DocumentData, V extends FirestoreData = FirestoreData>(
  snapshot: FirestoreSnapshot<T>
): V {
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as V
}
