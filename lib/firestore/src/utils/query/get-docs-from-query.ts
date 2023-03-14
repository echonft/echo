import { FirestoreQuery } from '../../types/abstract/firestore-query'
import { DocumentData, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'
import { andThen, pipe } from 'ramda'

export const getDocsFromQuery: <T extends DocumentData>(
  query: FirestoreQuery<T>
) => Promise<QueryDocumentSnapshot<T>[]> = pipe(
  getDocs,
  andThen((querySnaphot) => querySnaphot.docs)
)
