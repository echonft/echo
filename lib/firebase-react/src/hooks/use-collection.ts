import { UseCollectionOptions } from '../types'
import {
  convertDefault,
  getCollectionQueryFromPath,
  getDocsFromQuery,
  mapDefault,
  subscribeToQuery
} from '@echo/firestore'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isNilOrEmpty, promiseAll, Void } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, andThen, bind, ifElse, isEmpty, isNil, map, partialRight, pipe, prop } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

interface KeyData {
  path: string | undefined
}
function useCollectionInternal<W>(path: string | undefined, options?: UseCollectionOptions) {
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<W[], Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      { name: SwrKeyNames.FIRESTORE_COLLECTION, data: { path } },
      always(isNilOrEmpty(path))
    ),
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
