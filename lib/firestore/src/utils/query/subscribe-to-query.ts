import { convertDefault } from '../converter'
import { mapDefault } from '../mapper/map-default'
import { getDocsFromQuerySnapshot } from './get-docs-from-query-snapshot'
import { castAs, promiseAll } from '@echo/utils'
import { onSnapshot, Query, Unsubscribe } from 'firebase/firestore'
import { andThen, ifElse, isEmpty, map, pipe } from 'ramda'

export const subscribeToQuery = <W>(query: Query, onNext: (models: Promise<W[]>) => void): Unsubscribe =>
  onSnapshot(query, (snapshot) => {
    void pipe(
      getDocsFromQuerySnapshot,
      ifElse(
        isEmpty,
        () => castAs<W[]>([]),
        pipe(map(pipe(convertDefault, mapDefault)), promiseAll, castAs, andThen(onNext))
      )
    )(snapshot)
  })
