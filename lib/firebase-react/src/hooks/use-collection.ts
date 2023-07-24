import { UseCollectionOptions } from '../types/use-collection-options'
import {
  CollectionName,
  convertDefault,
  getCollectionQueryFromPath,
  getDocsFromQuery,
  mapDefault,
  subscribeToQuery
} from '@echo/firestore'
import { castAs, promiseAll, Void } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { QueryConstraint } from 'firebase/firestore'
import { andThen, ifElse, isEmpty, map, pipe } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

interface KeyData {
  path: CollectionName
  pathSegments?: string[]
  constraints?: QueryConstraint[]
}

export function useCollection<W>(args: {
  path: CollectionName
  pathSegments?: string[]
  options?: UseCollectionOptions
}) {
  const { suspense } = useSWRConfig()
  const { path, pathSegments, options } = args

  const response = useSWR<R.Result<W[], Error>, Error, KeyData>(
    { path, pathSegments, constraints: options?.constraints },
    pipe(
      getCollectionQueryFromPath,
      getDocsFromQuery,
      andThen(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ifElse(isEmpty, () => castAs<W[]>([]), pipe(map(pipe(convertDefault, mapDefault)), promiseAll, castAs<W[]>))
      ),
      R.fromPromise<W[]>
    ),
    { suspense: options?.suspense ?? suspense }
  )

  useEffect(() => {
    if (options?.listen) {
      return subscribeToQuery<W>(
        getCollectionQueryFromPath({ path, pathSegments, constraints: options?.constraints }),
        pipe(R.fromPromise, andThen(response.mutate), Void)
      )
    }
    return
  }, [path, pathSegments, options, response])

  return response
}
