import { CollectionReference, DocumentData, OrderByDirection, Query } from '@google-cloud/firestore'
import { identity, isNil } from 'ramda'

export const orderCollection = <T extends DocumentData>(
  fieldPath: string | undefined,
  direction?: OrderByDirection | undefined
) =>
  isNil(fieldPath) || isNil(direction)
    ? identity
    : (collection: CollectionReference<T> | Query<T>) => collection.orderBy(fieldPath, direction)
