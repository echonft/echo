import { castAs } from '@echo/utils'
import { CollectionReference, DocumentData, Query } from '@google-cloud/firestore'
import { isNil } from 'ramda'

export const pageCollection = <T extends DocumentData>(limit: number | undefined, offset?: number) =>
  isNil(limit)
    ? castAs<CollectionReference<T> | Query<T>, Query<T>>
    : (collection: CollectionReference<T> | Query<T>) => {
        const query = collection.limit(limit)
        if (isNil(offset)) {
          return query
        } else {
          return query.offset(offset)
        }
      }
