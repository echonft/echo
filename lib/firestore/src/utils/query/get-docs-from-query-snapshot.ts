import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { call, converge, identity, ifElse, invoker } from 'ramda'

export const getDocsFromQuerySnapshot = <T extends DocumentData>(
  snapshot: QuerySnapshot<T>
): QueryDocumentSnapshot<T>[] =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ifElse(converge(call, [invoker(1, 'empty')]), identity, converge(call, [invoker(1, 'docs')]))(snapshot)
