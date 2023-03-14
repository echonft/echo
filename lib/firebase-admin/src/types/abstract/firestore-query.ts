import { DocumentData, Query } from '@google-cloud/firestore'

export interface FirestoreQuery<T extends DocumentData> extends Query<T> {
  _query: Record<string, unknown> | undefined
}
