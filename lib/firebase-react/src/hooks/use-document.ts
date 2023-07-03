import { UseDocumentOptions } from '../types/use-document-options'
import {
  CollectionName,
  convertDefault,
  FirestoreRootCollectionDocumentData,
  FirestoreSnapshot,
  getDocSnapshotFromPath,
  mapDefault,
  subscribeToDocument
} from '@echo/firestore'
import { Void } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { DocumentData } from 'firebase/firestore'
import { andThen, converge, isNil, pipe, prop } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

export interface KeyData {
  path: CollectionName
  pathSegments?: string[]
}

/**
 * Returns a Firestore document
 * @param args
 */
export function useDocument<T extends DocumentData, V extends FirestoreRootCollectionDocumentData, W>(args: {
  path: CollectionName
  pathSegments?: string[]
  options?: UseDocumentOptions
}) {
  const { suspense } = useSWRConfig()
  const { path, pathSegments, options } = args
  const response = useSWR<R.Result<W, Error>, Error, KeyData>(
    { path, pathSegments },
    pipe(
      converge(getDocSnapshotFromPath, [prop('path'), prop('pathSegments')]),
      andThen(pipe<[FirestoreSnapshot<T>], Promise<V>, Promise<W>>(convertDefault, mapDefault)),
      R.fromPromise
    ),
    {
      suspense: options?.suspense ?? suspense
    }
  )

  useEffect(() => {
    if (!isNil(path) && options?.listen) {
      return subscribeToDocument<W>(pipe(R.fromPromise, andThen(response.mutate), Void), path)
    }
    return
  }, [options, path, response])

  return response
}
