import { collection, CollectionReference, getFirestore } from 'firebase/firestore'

export const getCollectionFromPath = <T>(path: string, ...pathSegments: string[]): CollectionReference<T> =>
  collection(getFirestore(), path, ...pathSegments) as CollectionReference<T>
