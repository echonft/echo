import { getCollectionFromPath } from '../collection/get-collection-from-path'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'

export const getDocRefFromPath = <T extends DocumentData>(
  collectionPath: string,
  documentPath: string
): DocumentReference<T> => getCollectionFromPath(collectionPath).doc(documentPath) as DocumentReference<T>
