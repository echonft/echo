import { useFirebase } from '@components/providers/firebase-provider'
import { getCollectionQueryFromPath, DocumentData, FirestoreDocumentPath } from '@echo/firestore'
import { logger } from '@echo/utils'
import { config } from '@lib/config/config'
import { failureResult, Result, successfulResult, SwrResult } from '@lib/services/swr/models/result'
import firebase from 'firebase/compat'
import { DocumentSnapshot, getDocs, onSnapshot, QueryConstraint, QuerySnapshot } from 'firebase/firestore'
import { isNil } from 'ramda'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

export type UseCollectionConstraints = QueryConstraint[]

export type UseCollectionOptions<T, W> = {
  constraints: UseCollectionConstraints
  mapper?: (documentSnapshots: DocumentSnapshot<T>[]) => Promise<W>[]
  listen?: boolean
  suspense?: boolean
}

function useCollectionInternal<T extends DocumentData, W = DocumentSnapshot<T>>(
  path: FirebaseDocument | undefined,
  options?: UseCollectionOptions<T, W>
): SwrResult<W[]> {
  const { firebaseApp } = useFirebase()
  const { mutate, suspense } = useSWRConfig()
  const { data, error } = useSWR<
    Result<W[]>,
    Error,
    [FirebaseDocument, UseCollectionOptions<T, W> | undefined] | undefined
  >(
    !isNil(path) && !isNil(firebaseApp) ? [path, options] : undefined,
    (path, options) => {
      const query = getCollectionQueryFromPath<T>(documentPath(path), options?.constraints)
      const key = query ? JSON.stringify(query._query) : null
      // If the query is wrong we won't call SWR and can return directly
      if (query && !key) {
        return failureResult('_query property missing - check firestore implementation')
      }
      if (!query) {
        logger.error('query is null')
        return failureResult('query is null')
      }
      return getDocs<T>(query).then((queryDocumentSnapshots) => {
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
    logger.error(`Error fetching collection at ${path}`, error)
    return failureResult(error.message)
  }
  return data
}

export function useCollection<T extends DocumentData, W = DocumentSnapshot<T>>(
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
    const query = getCollectionQueryFromPath<T>(path, options?.constraints)
    if (query) {
      unsub = onSnapshot<T>(query, (querySnapshot: QuerySnapshot<T>) => {
        querySnapshot.docs.forEach((queryDocumentSnapshot) => {
          void mutate(queryDocumentSnapshot.ref.path, querySnapshot.docs)
        })
      })
    }
  }
  return result
}
