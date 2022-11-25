import { useFirebase } from '@components/providers/firebase-provider'
import { documentPath, FirebaseDocument } from '@echo/firebase/paths/document-path'
import { getCollectionQuery } from '@echo/firebase/queries/collection'
import { logger } from '@echo/utils/logger'
import { config } from '@lib/config/config'
import { failureResult, Result, successfulResult, SwrResult } from '@lib/services/swr/models/result'
import firebase from 'firebase/compat'
import { DocumentSnapshot, getDocs, onSnapshot, QueryConstraint, QuerySnapshot } from 'firebase/firestore'
import { isNil } from 'rambda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

export type UseCollectionConstraints = QueryConstraint[]

export type UseCollectionOptions<T, W> = {
  constraints: UseCollectionConstraints
  mapper?: (documentSnapshots: DocumentSnapshot<T>[]) => Promise<W>[]
  listen?: boolean
  suspense?: boolean
}

function useCollectionInternal<T, W = DocumentSnapshot<T>>(
  path: string | undefined,
  options?: UseCollectionOptions<T, W>
): SwrResult<W[]> {
  const { firebaseApp } = useFirebase()
  const { mutate, suspense } = useSWRConfig()

  const { data, error } = useSWR<Result<W[]>, Error>(
    firebaseApp && [path, options],
    (path, options) => {
      const collectionQuery = getCollectionQuery<T>(documentPath(path), options?.constraints)
      const key = collectionQuery ? JSON.stringify(collectionQuery._query) : null
      // If the query is wrong we won't call SWR and can return directly
      if (collectionQuery && !key) {
        return failureResult('_query property missing - check firestore implementation')
      }
      if (!collectionQuery) {
        logger.error('query is null')
        return failureResult('query is null')
      }
      return getDocs<T>(collectionQuery).then((queryDocumentSnapshots) => {
        // Could optimize this
        queryDocumentSnapshots.docs.forEach((queryDocumentSnapshot) => {
          void mutate(queryDocumentSnapshot.ref.path, queryDocumentSnapshot, false)
        })
        if (queryDocumentSnapshots.empty) {
          return successfulResult([])
        }
        if (isNil(options) || isNil(options?.mapper)) {
          return successfulResult(queryDocumentSnapshots.docs as unknown as W[])
        } else {
          return Promise.all<W>(options.mapper(queryDocumentSnapshots.docs)).then((mappedData) =>
            successfulResult(mappedData)
          )
        }
      })
    },
    { suspense: options?.suspense || suspense }
  )

  if (error) {
    logger.error(`Error fetching collection at ${path!}`, error)
    return failureResult(error.message)
  }
  return data
}

export function useCollection<T, W = DocumentSnapshot<T>>(
  path: FirebaseDocument | undefined,
  options?: UseCollectionOptions<T, W>
): SwrResult<W[]> {
  const { mutate } = useSWRConfig()
  const result = useCollectionInternal<T, W>(path, options)
  let unsub: firebase.Unsubscribe | undefined = undefined

  useEffect((): VoidFunction | undefined => {
    return unsub
  }, [unsub])

  if (path && config.useMock && options?.listen) {
    const collectionQuery = getCollectionQuery<T>(path, options?.constraints)
    if (collectionQuery) {
      unsub = onSnapshot<T>(collectionQuery, (querySnapshot: QuerySnapshot<T>) => {
        querySnapshot.docs.forEach((queryDocumentSnapshot) => {
          void mutate(queryDocumentSnapshot.ref.path, querySnapshot.docs)
        })
      })
    }
  }
  return result
}
