import { firestore } from '../../services/firestore'
import { CollectionReference, DocumentData } from '@google-cloud/firestore'

export const getCollectionFromPath = <T extends DocumentData>(collectionPath: string): CollectionReference<T> =>
  firestore().collection(collectionPath) as CollectionReference<T>
