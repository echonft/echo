import { FirestoreDocumentPath, FirestoreQuery } from '../../types'
import { getCollectionFromPath } from '../collection/get-collection-from-path'
import { DocumentData, query, QueryConstraint } from 'firebase/firestore'

export const collectionQuery = <T extends DocumentData>(
  path: FirestoreDocumentPath,
  constraints: QueryConstraint[] = []
): FirestoreQuery<T> => query<T>(getCollectionFromPath<T>(path), ...constraints) as FirestoreQuery<T>
