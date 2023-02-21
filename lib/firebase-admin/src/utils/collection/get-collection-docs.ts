import { CollectionReference, DocumentData, Query } from '@google-cloud/firestore'

export const getCollectionDocs = <T extends DocumentData>(collection: CollectionReference<T> | Query<T>) =>
  collection.get().then((snapshot) => snapshot.docs)
