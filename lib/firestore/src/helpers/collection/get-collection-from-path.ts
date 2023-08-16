import { CollectionName } from '../../constants/collection-name'
import { firestore } from '../../services/firestore'
import { CollectionReference, DocumentData } from 'firebase-admin/firestore'

export const getCollectionFromPath = <T extends DocumentData>(collectionName: CollectionName): CollectionReference<T> =>
  firestore().collection(collectionName) as CollectionReference<T>
