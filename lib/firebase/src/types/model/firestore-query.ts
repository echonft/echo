import { Query } from 'firebase/firestore'

export interface FirestoreQuery<T> extends Query<T> {
  _query: Record<string, unknown> | undefined
}
