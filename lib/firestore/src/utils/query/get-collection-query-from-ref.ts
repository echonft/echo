import { CollectionReference, DocumentData, query, QueryConstraint } from 'firebase/firestore'

export const getCollectionQueryFromRef =
  <T extends DocumentData>(constraints: QueryConstraint[] = []) =>
  (collectionReference: CollectionReference<T>) =>
    query<T>(collectionReference, ...constraints)
