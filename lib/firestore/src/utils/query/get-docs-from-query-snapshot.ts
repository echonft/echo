import { castAs } from '@echo/utils'
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { call, ifElse, invoker, pipe } from 'ramda'

export const getDocsFromQuerySnapshot = <T extends DocumentData>(
  snapshot: QuerySnapshot<T>
): QueryDocumentSnapshot<T>[] =>
  ifElse<[QuerySnapshot<T>], QueryDocumentSnapshot<T>[], QueryDocumentSnapshot<T>[]>(
    pipe(invoker(1, 'empty'), call),
    castAs,
    pipe(invoker(1, 'docs'), call)
  )(snapshot)
