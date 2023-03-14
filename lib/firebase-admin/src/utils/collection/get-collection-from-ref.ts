import { CollectionReference, DocumentData, DocumentReference } from '@google-cloud/firestore'

export const getCollectionFromRef = <T extends DocumentData>(
  documentRef: DocumentReference,
  collectionPath: string
): CollectionReference<T> => documentRef.collection(collectionPath) as CollectionReference<T>
