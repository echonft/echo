import { UseCollectionOptions } from '../types'
import {
  FirestoreDocumentPath,
  FirestoreMapper,
  FirestoreQuery,
  getCollectionQueryFromPath,
  getDocsFromQuery,
  querySnapshotDocs,
  subscribeToQuery
} from '@echo/firestore'
import { Model } from '@echo/model'
import { getCompoundKey, SwrKeys } from '@echo/swr'
import { R } from '@mobily/ts-belt'
import { DocumentData } from 'firebase/firestore'
import { andThen, ifElse, isNil, map, pipe } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

function useCollectionInternal<T extends DocumentData, W extends Model>(
  path: FirestoreDocumentPath,
  mapper: FirestoreMapper<T, W>,
  options?: UseCollectionOptions
) {
  const { suspense } = useSWRConfig()
  const query = getCollectionQueryFromPath(path, options?.constraints)
  const key = JSON.stringify(query._query)
  return useSWR<R.Result<W[], Error>, Error, string>(
    getCompoundKey(SwrKeys.FIRESTORE_COLLECTION, path, key),
    () =>
      pipe(
        getDocsFromQuery,
        andThen(
          ifElse(
            (querySnapshot) => querySnapshot.empty,
            () => Promise.resolve([]),
            pipe(querySnapshotDocs, map(mapper), (promises) => Promise.all(promises))
          )
        ),
        R.fromPromise
      )(query as FirestoreQuery<T>),
    { suspense: options?.suspense || suspense }
  )
}

export function useCollection<T extends DocumentData, W extends Model>(
  path: FirestoreDocumentPath,
  mapper: FirestoreMapper<T, W>,
  options?: UseCollectionOptions
) {
  const response = useCollectionInternal<T, W>(path, mapper, options)
  useEffect(() => {
    if (!isNil(path) && options?.listen) {
      const query = getCollectionQueryFromPath<T>(path, options?.constraints)
      return subscribeToQuery(
        query,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        pipe(querySnapshotDocs, map(mapper), (promises) => Promise.all(promises), R.fromPromise, response.mutate)
      )
    }
    return
  }, [path, options, options?.listen, response.mutate, mapper])
  return response
}
