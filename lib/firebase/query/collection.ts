import { collection, CollectionReference, getFirestore, Query, query, QueryConstraint } from 'firebase/firestore'

export const getCollectionQuery = <T>(
  path: string | null | undefined,
  constraints: QueryConstraint[] = []
): Query<T> | null =>
  path ? query<T>(collection(getFirestore(), path) as CollectionReference<T>, ...constraints) : null
