import { UseCollectionOptions } from '../types'
import { convertDefault, getCollectionQueryFromPath, getDocsFromQuery, subscribeToQuery } from '@echo/firestore'
import { mapDefault } from '@echo/firestore/dist/utils/mapper/map-default'
import { SwrKeyNames } from '@echo/swr'
import { castAs, promiseAll, Void } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, bind, ifElse, isEmpty, isNil, map, partialRight, pipe, prop } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

function useCollectionInternal<W>(path: string, options?: UseCollectionOptions) {
  const { suspense } = useSWRConfig()
  return useSWR(
    { name: SwrKeyNames.FIRESTORE_COLLECTION, data: { path } },
    pipe(
      prop('data'),
      prop('path'),
      partialRight(getCollectionQueryFromPath, [...(options?.constraints ?? [])]),
      getDocsFromQuery,
      andThen(
        ifElse(isEmpty, () => castAs<W[]>([]), pipe(map(pipe(convertDefault, mapDefault)), promiseAll, castAs<W[]>))
      ),
      R.fromPromise<W[]>
    ),
    { suspense: options?.suspense || suspense }
  )
}

export function useCollection<W>(path: string, options?: UseCollectionOptions) {
  const response = useCollectionInternal<W>(path, options)
  useEffect(() => {
    if (!isNil(path) && options?.listen) {
      return subscribeToQuery<W>(
        getCollectionQueryFromPath(path, ...(options?.constraints ?? [])),
        pipe(R.fromPromise, bind(response.mutate, response), Void)
      )
    }
    return
  }, [path, options, response])
  return response
}
