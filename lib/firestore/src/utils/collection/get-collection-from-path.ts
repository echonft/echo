import { collection, CollectionReference, getFirestore } from 'firebase/firestore'

export const getCollectionFromPath = <T>(path: string): CollectionReference<T> =>
  collection(getFirestore(), path) as CollectionReference<T>
