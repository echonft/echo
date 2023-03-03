import { getCollectionFromPath } from '../collection/get-collection-from-path'
import { DocumentData, query, QueryConstraint } from 'firebase/firestore'

export const getCollectionQueryFromPath = <T extends DocumentData>(path: string, ...constraints: QueryConstraint[]) =>
  query<T>(getCollectionFromPath<T>(path), ...constraints)
