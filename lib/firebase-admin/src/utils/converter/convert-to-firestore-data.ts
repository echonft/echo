import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreData } from '@echo/firestore'
import { DocumentData } from '@google-cloud/firestore'
import { assoc, reduce } from 'ramda'

export function convertToFirestoreData<T extends DocumentData, V extends FirestoreData = FirestoreData>(
  snapshot: FirestoreSnapshot<T>,
  subcollectionPaths: string[] = []
): V {
  return reduce<string, Partial<V>>(
    (obj, key) => assoc(key, snapshot.ref.collection(key), obj) as Partial<V>,
    {
      id: snapshot.id,
      ...snapshot.data()
    } as Partial<V>,
    subcollectionPaths
  ) as V
}
