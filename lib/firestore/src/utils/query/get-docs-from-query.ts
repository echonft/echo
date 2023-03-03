import { castAs } from '@echo/utils'
import { DocumentData, getDocs, Query, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { andThen, ifElse, pipe } from 'ramda'

export const getDocsFromQuery = <T extends DocumentData>(query: Query<T>): Promise<QueryDocumentSnapshot<T>[]> =>
  pipe<[Query<T>], Promise<QuerySnapshot<T>>, Promise<QueryDocumentSnapshot<T>[]>>(
    getDocs,
    andThen<QuerySnapshot<T>, QueryDocumentSnapshot<T>[]>(
      ifElse<[QuerySnapshot<T>], QueryDocumentSnapshot<T>[], QueryDocumentSnapshot<T>[]>(
        (querySnaphot) => querySnaphot.size > 0,
        (querySnaphot) => querySnaphot.docs,
        (_querySnaphot) => castAs<QueryDocumentSnapshot<T>[]>([])
      )
    )
  )(query)
