import {
  collection,
  CollectionReference,
  getFirestore,
  Query as FirestoreQuery,
  query,
  QueryConstraint
} from 'firebase/firestore'

interface Query<T> extends FirestoreQuery<T> {
  _query: Record<string, unknown> | undefined
}

export const getCollectionQuery = <T>(
  path: string | null | undefined,
  constraints: QueryConstraint[] = []
): Query<T> | null =>
  path ? (query<T>(collection(getFirestore(), path) as CollectionReference<T>, ...constraints) as Query<T>) : null
