import { UseDocumentOptions } from '../types/use-document-options'
import { useFirebase } from './use-firebase'
import { FirestoreMapper, FirestoreSnapshot, subscribeToDocument } from '@echo/firestore'
import { getDocSnapshotFromPath } from '@echo/firestore/dist/utils/document/get-doc-snapshot-from-path'
import { R } from '@mobily/ts-belt'
import { DocumentData } from 'firebase/firestore'
import { andThen, pipe } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

function useDocumentInternal<T extends DocumentData, W>(
  path: string,
  mapper: FirestoreMapper<T, W>,
  options?: UseDocumentOptions
) {
  useFirebase()
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<W, Error>, Error, string>(
    path,
    pipe<[string], Promise<FirestoreSnapshot<T>>, Promise<W>, Promise<R.Result<W, Error>>>(
      getDocSnapshotFromPath,
      andThen(mapper),
      R.fromPromise
    ),
    { suspense: options?.suspense || suspense }
  )
}

/**
 * Returns a Firestore document
 * @param path
 * @param mapper
 * @param options
 */
export function useDocument<T extends DocumentData, W>(
  path: string,
  mapper: FirestoreMapper<T, W>,
  options?: UseDocumentOptions
) {
  const response = useDocumentInternal<T, W>(path, mapper, options)

  useEffect(() => {
    if (options?.listen) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      return subscribeToDocument(pipe(mapper, response.mutate, R.fromPromise), path)
    }
    return
  }, [options, path, response.mutate, mapper])
  return response
}
