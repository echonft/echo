import { FirestoreQuery } from '../../types'
import { getCollectionFromPath } from '../collection/get-collection-from-path'
import { DocumentData, query, QueryConstraint } from 'firebase/firestore'

export const collectionQuery =
  <T extends DocumentData>(
    path: string,
    ...pathSegments: string[]
  ): ((...constraints: QueryConstraint[]) => FirestoreQuery<T>) =>
  (...constraints: QueryConstraint[]) =>
    query<T>(getCollectionFromPath<T>(path, ...pathSegments), ...constraints) as FirestoreQuery<T>
