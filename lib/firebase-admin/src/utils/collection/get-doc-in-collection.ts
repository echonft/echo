import { CollectionReference, DocumentData } from '@google-cloud/firestore'

export const getDocInCollection = <T extends DocumentData>(collection: CollectionReference<T>, documentPath: string) =>
  collection.doc(documentPath)
