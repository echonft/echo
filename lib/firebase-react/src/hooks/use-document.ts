import { UseDocumentOptions } from '../types/use-document-options'
import { useFirebase } from './use-firebase'
import { convertDefault, FirestoreDocumentData, FirestoreMapper, subscribeToDocument } from '@echo/firestore'
import { FirestoreConverter } from '@echo/firestore/dist/types/converter/firestore-converter'
import { getDocSnapshotFromPath } from '@echo/firestore/dist/utils/document/get-doc-snapshot-from-path'
import { R } from '@mobily/ts-belt'
import { DocumentData } from 'firebase/firestore'
import { andThen, bind, pipe } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

function useDocumentInternal<T extends DocumentData, V extends FirestoreDocumentData, W>(
  path: string,
  mapper: FirestoreMapper<V, W>,
  options?: UseDocumentOptions
) {
  useFirebase()
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<W, Error>, Error, string>(
    path,
    () => pipe(getDocSnapshotFromPath, andThen(pipe(convertDefault, mapper)), R.fromPromise)(path),
    {
      suspense: options?.suspense || suspense
    }
  )
}

/**
 * Returns a Firestore document
 * @param path
 * @param converter
 * @param mapper
 * @param options
 */
export function useDocument<T extends DocumentData, V extends FirestoreDocumentData, W>(
  path: string,
  converter: FirestoreConverter<T, V>,
  mapper: FirestoreMapper<V, W>,
  options?: UseDocumentOptions
) {
  const response = useDocumentInternal<T, V, W>(path, converter, mapper, options)

  useEffect(() => {
    if (options?.listen) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      return subscribeToDocument(pipe(converter, mapper, bind(response.mutate, response)), path)
    }
    return
  }, [options, path, response.mutate, mapper])
  return response
}
