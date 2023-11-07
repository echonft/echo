import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Query } from 'firebase-admin/firestore'

export interface QueryWithConstraints<T> {
  query: Query<T>
  constraints: QueryConstraints<T> | undefined
}
