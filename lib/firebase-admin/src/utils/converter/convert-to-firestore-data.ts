import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreData } from '@echo/firestore'
import { DocumentData } from '@google-cloud/firestore'

export function convertToFirestoreData<T extends DocumentData, V extends FirestoreData = FirestoreData>(
  snapshot: FirestoreSnapshot<T>
): V {
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as V
}
