import { castAs } from '@echo/utils'
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { ifElse } from 'ramda'

export const getDocsFromQuerySnapshot = <T extends DocumentData>(
  snapshot: QuerySnapshot<T>
): QueryDocumentSnapshot<T>[] =>
  ifElse<[QuerySnapshot<T>], QueryDocumentSnapshot<T>[], QueryDocumentSnapshot<T>[]>(
    (querySnaphot) => querySnaphot.size > 0,
    (querySnaphot) => querySnaphot.docs,
    (_querySnaphot) => castAs<QueryDocumentSnapshot<T>[]>([])
  )(snapshot)
