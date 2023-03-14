import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreData } from '@echo/firestore'
import { DocumentData } from '@google-cloud/firestore'

export function convertSnapshot<T extends DocumentData, V extends FirestoreData = FirestoreData>(
  snapshot: FirestoreSnapshot<T>
): V {
  if (!snapshot.exists) {
    throw Error(`Document ${snapshot.id} does not exist`)
  }
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as unknown as V
}
