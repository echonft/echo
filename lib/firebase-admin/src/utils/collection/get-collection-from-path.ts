import { firestore } from '../../services/firestore'
import { CollectionName } from '@echo/firestore'
import { CollectionReference, DocumentData } from '@google-cloud/firestore'

export const getCollectionFromPath = <T extends DocumentData>(collectionName: CollectionName): CollectionReference<T> =>
  firestore().collection(collectionName) as CollectionReference<T>
