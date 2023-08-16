import { CollectionReference, DocumentData, Query } from 'firebase-admin/firestore'

export const getCollectionDocs = <T extends DocumentData>(collection: CollectionReference<T> | Query<T>) =>
  collection.get().then((snapshot) => snapshot.docs)
