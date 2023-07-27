import { convertDefault } from '../converter/convert-default'
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pipe(map(pipe(convertDefault, mapDefault)), promiseAll, castAs, andThen(onNext))
      )
    )(snapshot)
  })
