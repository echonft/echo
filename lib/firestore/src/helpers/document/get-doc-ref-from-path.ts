import { CollectionName } from '../../constants/collection-name'
import { getCollectionFromPath } from '../collection/get-collection-from-path'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export const getDocRefFromPath = <T extends DocumentData>(
  collectionPath: CollectionName,
  documentPath: string
): DocumentReference<T> => getCollectionFromPath(collectionPath).doc(documentPath) as DocumentReference<T>
