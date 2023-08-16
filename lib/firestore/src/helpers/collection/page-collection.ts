import { CollectionReference, DocumentData, Query } from 'firebase-admin/firestore'
import { identity, isNil } from 'ramda'

export const pageCollection = <T extends DocumentData>(limit: number | undefined, offset?: number) =>
  isNil(limit)
    ? identity
    : (collection: CollectionReference<T> | Query<T>) => {
        const query = collection.limit(limit)
        if (isNil(offset)) {
          return query
        } else {
          return query.offset(offset)
        }
      }
