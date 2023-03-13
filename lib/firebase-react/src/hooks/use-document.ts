import { UseDocumentOptions } from '../types/use-document-options'
import { useFirebase } from './use-firebase'
import {
  convertDefault,
  FirestoreRootCollectionDocumentData,
  FirestoreSnapshot,
  subscribeToDocument
} from '@echo/firestore'
import { getDocSnapshotFromPath } from '@echo/firestore/dist/utils/document/get-doc-snapshot-from-path'
import { mapDefault } from '@echo/firestore/dist/utils/mapper/map-default'
import { SwrKeyNames } from '@echo/swr'
import { Void } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { DocumentData } from 'firebase/firestore'
import { andThen, bind, pipe, prop } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

function useDocumentInternal<T extends DocumentData, V extends FirestoreRootCollectionDocumentData, W>(
  path: string,
  options?: UseDocumentOptions
) {
  useFirebase()
  const { suspense } = useSWRConfig()
  return useSWR(
    { name: SwrKeyNames.FIRESTORE_DOCUMENT, data: { path } },
    pipe(
      prop('data'),
      prop('path'),
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
  path: string,
  options?: UseDocumentOptions
) {
  const response = useDocumentInternal<T, V, W>(path, options)

  useEffect(() => {
    if (options?.listen) {
      return subscribeToDocument<W>(pipe(R.fromPromise, bind(response.mutate, response), Void), path)
    }
    return
  }, [options, path, response])
  return response
}
