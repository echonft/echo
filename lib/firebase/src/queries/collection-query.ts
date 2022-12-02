import { DocumentData } from '../types/firestore'
import { FirestoreQuery } from '../types/model/firestore-query'
import { collection, CollectionReference, getFirestore, query, QueryConstraint } from 'firebase/firestore'

export const collectionQuery = <T extends DocumentData>(
  path: string | null | undefined,
  constraints: QueryConstraint[] = []
): FirestoreQuery<T> | null =>
  path
    ? (query<T>(collection(getFirestore(), path) as CollectionReference<T>, ...constraints) as FirestoreQuery<T>)
    : null
