import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreData } from '../../types/model/data/abstract/firestore-data'
import { getSubcollection } from '../collection/get-subcollection'
import { DocumentData } from 'firebase/firestore'
import { assoc, reduce } from 'ramda'

export function convertToFirestoreData<T extends DocumentData, V extends FirestoreData = FirestoreData>(
  snapshot: FirestoreSnapshot<T>,
  subcollectionPaths: string[] = []
): V {
  return reduce<string, Partial<V>>(
    (obj, key) => assoc(key, getSubcollection(snapshot.ref, key), obj) as Partial<V>,
    {
      id: snapshot.id,
      ...snapshot.data()
    } as Partial<V>,
    subcollectionPaths
  ) as V
}
