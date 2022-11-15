import { getCollectionQuery } from '@echo/firebase/query/collection'
import { useFirebase } from '@echo/frontend/components/providers/firebase-provider'
import { useLogger } from '@echo/frontend/components/providers/logger-provider'
import { AppEnvironment, config } from '@echo/frontend/lib/config/config'
import { failureResult, Result, successfulResult, SwrResult } from '@echo/frontend/lib/services/swr/models/result'
import firebase from 'firebase/compat'
import { DocumentSnapshot, getDocs, onSnapshot, QueryConstraint } from 'firebase/firestore'
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

function useCollectionInternal<T, W = DocumentSnapshot<T>>(
  path: string | null | undefined,
  options?: UseCollectionOptions<T, W>
): SwrResult<W[]> {
  const logger = useLogger()
  const { firebaseApp } = useFirebase()
  const { mutate, suspense } = useSWRConfig()
  const collectionQuery = getCollectionQuery<T>(path, options?.constraints)
  const key = collectionQuery ? JSON.stringify((collectionQuery as any)._query) : null
  const { data, error } = useSWR<Result<W[]>>(
    firebaseApp && ((collectionQuery && key) || !collectionQuery) && { path, key },
    () => {
      if (!collectionQuery) {
        return failureResult('query is null')
      }
      return getDocs<T>(collectionQuery).then((queryDocumentSnapshots) => {
        queryDocumentSnapshots.docs.forEach((queryDocumentSnapshot) => {
          mutate(queryDocumentSnapshot.ref.path, queryDocumentSnapshot, false)
        })
        if (queryDocumentSnapshots.empty) {
          return successfulResult()
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
  // If there query is wrong we won't call SWR and can return directly
  if (collectionQuery && !key) {
    return failureResult('_query property missing - check firestore implementation')
  }
  if (error) {
    logger.error(`Error fetching collection at ${path}`, error)
    return failureResult(error)
  }
  return data
}

export function useCollection<T, W = DocumentSnapshot<T>>(
  path: string | null | undefined,
  options?: UseCollectionOptions<T, W>
): SwrResult<W[]> {
  const { mutate } = useSWRConfig()
  const result = useCollectionInternal<T, W>(path, options)
  let unsub: firebase.Unsubscribe | undefined = undefined

  useEffect((): VoidFunction | undefined => {
    return unsub
  }, [unsub])

  if (path && config().appEnvironment !== AppEnvironment.MOCK && options?.listen) {
    const collectionQuery = getCollectionQuery<T>(path, options?.constraints)
    if (collectionQuery) {
      unsub = onSnapshot(collectionQuery, (querySnapshot) => {
        querySnapshot.docs.forEach((queryDocumentSnapshot) => {
          mutate(queryDocumentSnapshot.ref.path, querySnapshot.docs)
        })
      })
    }
  }
  return result
}
