import { CollectionName } from '../../config/collection-name'
import { getCollectionFromPath } from '../collection/get-collection-from-path'
import { DocumentData, query, QueryConstraint } from 'firebase/firestore'

export const getCollectionQueryFromPath = <T extends DocumentData>(args: {
  path: CollectionName
  pathSegments?: string[]
  constraints?: QueryConstraint[]
}) => {
  const { path, pathSegments, constraints } = args
  return query<T>(getCollectionFromPath<T>(path, ...(pathSegments ?? [])), ...(constraints ?? []))
}
