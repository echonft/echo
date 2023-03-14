import { UseDocumentOptions } from '../types/use-document-options'
import {
  convertDefault,
  FirestoreRootCollectionDocumentData,
  FirestoreSnapshot,
  subscribeToDocument
} from '@echo/firestore'
import { getDocSnapshotFromPath } from '@echo/firestore/dist/utils/document/get-doc-snapshot-from-path'
import { mapDefault } from '@echo/firestore/dist/utils/mapper/map-default'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty, Void } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { DocumentData } from 'firebase/firestore'
import { always, andThen, bind, isNil, pipe, prop } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

export interface KeyData {
  path: string | undefined
}
function useDocumentInternal<T extends DocumentData, V extends FirestoreRootCollectionDocumentData, W>(
  path: string | undefined,
  options?: UseDocumentOptions
) {
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<W, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      { name: SwrKeyNames.FIRESTORE_DOCUMENT, data: { path } },
      always(isNilOrEmpty(path))
    ),
    pipe(
      prop('data'),
      prop<string>('path'),
      getDocSnapshotFromPath,
      andThen(pipe<[FirestoreSnapshot<T>], Promise<V>, Promise<W>>(convertDefault, mapDefault)),
      R.fromPromise
    ),
    {
      suspense: options?.suspense || suspense
    }
  )
}

/**
 * Returns a Firestore document
 * @param path
 * @param options
 */
export function useDocument<T extends DocumentData, V extends FirestoreRootCollectionDocumentData, W>(
  path: string | undefined,
  options?: UseDocumentOptions
) {
  const response = useDocumentInternal<T, V, W>(path, options)

  useEffect(() => {
    if (!isNil(path) && options?.listen) {
      return subscribeToDocument<W>(pipe(R.fromPromise, bind(response.mutate, response), Void), path)
    }
    return
  }, [options, path, response])
  return response
}
