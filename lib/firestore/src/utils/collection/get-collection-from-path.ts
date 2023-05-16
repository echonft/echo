import { CollectionName } from '../../config/collection-name'
import { collection, CollectionReference, getFirestore } from 'firebase/firestore'

export const getCollectionFromPath = <T>(path: CollectionName, ...pathSegments: string[]): CollectionReference<T> =>
  collection(getFirestore(), path, ...pathSegments) as CollectionReference<T>
