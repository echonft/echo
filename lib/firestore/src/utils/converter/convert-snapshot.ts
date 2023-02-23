import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreData } from '../../types/model/data/abstract/firestore-data'
import { DocumentData } from 'firebase/firestore'

export function convertSnapshot<T extends DocumentData, V extends FirestoreData = FirestoreData>(
  snapshot: FirestoreSnapshot<T>
): V {
  if (!snapshot.exists) {
    throw Error(`Document does not exist`)
  }
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as unknown as V
}
