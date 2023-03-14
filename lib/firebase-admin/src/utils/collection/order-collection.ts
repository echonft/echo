import { castAs } from '@echo/utils'
import { CollectionReference, DocumentData, OrderByDirection, Query } from '@google-cloud/firestore'
import { isNil } from 'ramda'

export const orderCollection = <T extends DocumentData>(
  fieldPath: string | undefined,
  direction?: OrderByDirection | undefined
) =>
  isNil(fieldPath) || isNil(direction)
    ? castAs<CollectionReference<T> | Query<T>, Query<T>>
    : (collection: CollectionReference<T> | Query<T>) => collection.orderBy(fieldPath, direction)
