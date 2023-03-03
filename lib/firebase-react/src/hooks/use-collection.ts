import { UseCollectionOptions } from '../types'
import { convertDefault, getCollectionQueryFromPath, getDocsFromQuery, subscribeToQuery } from '@echo/firestore'
import { mapDefault } from '@echo/firestore/dist/utils/mapper/map-default'
import { getCompoundKey, SwrKeys } from '@echo/swr'
import { castAs, promiseAll } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, bind, ifElse, isEmpty, isNil, map, pipe } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

function useCollectionInternal<W>(path: string, options?: UseCollectionOptions) {
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<W[], Error>, Error, string>(
    getCompoundKey(SwrKeys.FIRESTORE_COLLECTION, path),
    () =>
      pipe(
        getCollectionQueryFromPath,
        getDocsFromQuery,
        andThen(
          ifElse(
            isEmpty,
            () => castAs<W[]>([]),
            pipe(map(pipe(convertDefault, mapDefault)), promiseAll, castAs<Promise<W[]>>)
          )
        ),
        R.fromPromise
      )(path, ...(options?.constraints ?? [])),
    { suspense: options?.suspense || suspense }
  )
}

export function useCollection<W>(path: string, options?: UseCollectionOptions) {
  const response = useCollectionInternal<W>(path, options)
  useEffect(() => {
    if (!isNil(path) && options?.listen) {
      return subscribeToQuery<W>(
        getCollectionQueryFromPath(path, ...(options?.constraints ?? [])),
        pipe(R.fromPromise, bind(response.mutate, response))
      )
    }
    return
  }, [path, options, response])
  return response
}
