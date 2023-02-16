import { UseDocumentOptions } from '../types/use-document-options'
import { useFirebase } from './use-firebase'
import { FirestoreDocumentPath, FirestoreMapper } from '@echo/firestore'
import { Model } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { DocumentData } from 'firebase/firestore'
import { getDocSnapshotFromPath } from 'lib/firestore/src/utils/document/get-doc-snapshot-from-path'
import { subscribeToDocument } from 'lib/firestore/src/utils/document-reference/subscribe-to-document'
import { andThen, pipe } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

function useDocumentInternal<T extends DocumentData, W extends Model>(
  path: FirestoreDocumentPath,
  mapper: FirestoreMapper<T, W>,
  options?: UseDocumentOptions
) {
  useFirebase()
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<W, Error>, Error, FirestoreDocumentPath>(
    path,
    () => pipe(getDocSnapshotFromPath, andThen(mapper), R.fromPromise)(path),
    { suspense: options?.suspense || suspense }
  )
}

/**
 * Returns a Firestore document
 * @param path
 * @param mapper
 * @param options
 */
export function useDocument<T extends DocumentData, W extends Model>(
  path: FirestoreDocumentPath,
  mapper: FirestoreMapper<T, W>,
  options?: UseDocumentOptions
) {
  const response = useDocumentInternal<T, W>(path, mapper, options)

  useEffect(() => {
    if (options?.listen) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      return subscribeToDocument(path, pipe(mapper, R.fromPromise, response.mutate))
    }
    return
  }, [options, path, response.mutate, mapper])
  return response
}
