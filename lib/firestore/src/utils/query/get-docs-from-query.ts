import { getDocsFromQuerySnapshot } from './get-docs-from-query-snapshot'
import { DocumentData, getDocs, Query, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { andThen, pipe } from 'ramda'

export const getDocsFromQuery = <T extends DocumentData>(query: Query<T>): Promise<QueryDocumentSnapshot<T>[]> =>
  pipe<[Query<T>], Promise<QuerySnapshot<T>>, Promise<QueryDocumentSnapshot<T>[]>>(
    getDocs,
    andThen(getDocsFromQuerySnapshot)
  )(query)
