import { useFirebase } from '@components/providers/firebase-provider'
import { firebaseDocSnapshotFromPath, FirestorePath } from '@echo/firebase'
import { errorMessage, logger } from '@echo/utils'
import { config } from '@lib/config/config'
import { failureResult, Result, successfulResult, SwrResult } from '@lib/services/swr/models/result'
import { doc, DocumentData, DocumentReference, DocumentSnapshot, getFirestore, onSnapshot } from 'firebase/firestore'
import { isEmpty, isNil } from 'ramda'
import { useEffect } from 'react'
import useSWR, { SWRResponse, useSWRConfig } from 'swr'

export type UseDocumentOptions<T extends DocumentData, W> = {
  listen?: boolean
  suspense?: boolean
  mapper?: (snapshot: DocumentSnapshot<T>) => Promise<W>
}

function useDocumentInternal<T extends DocumentData, W = T>(
  path: FirebaseDocument | undefined,
  segment: string | undefined,
  options?: UseDocumentOptions<T, W>
): Partial<SWRResponse<Result<W>>> {
  const { firebaseApp } = useFirebase()
  const { suspense } = useSWRConfig()
  const { data, mutate, error } = useSWR<Result<W>, Error, [FirebaseDocument, string] | undefined>(
    !isNil(firebaseApp) && !isNil(path) && !isNil(segment) && !isEmpty(segment) ? [path, segment] : undefined,
    (path, segment) =>
      firebaseDocSnapshotFromPath<T>(path, segment).then((doc) => {
        if (isNil(doc) || !(doc as DocumentSnapshot<T>).exists()) {
          const message = `doc is undefined for ${path}/${segment}`
          logger.error(message)
          return failureResult(message)
        } else if (isNil(options) || isNil(options?.mapper)) {
          return successfulResult(doc.data() as unknown as W)
        } else {
          return options.mapper?.(doc as DocumentSnapshot<T>).then((mappedData) => successfulResult(mappedData))
        }
      }),
    { suspense: options?.suspense || suspense }
  )
  if (!path) {
    return { data: failureResult('path is null'), mutate }
  }
  if (error) {
    logger.error(`Error fetching document at ${path}${segment!}`, error)
    return { data: failureResult(error.message), mutate }
  }
  return { data, mutate }
}

/**
 * Returns a Firestore document
 * @param path
 * @param segment
 * @param options?
 */
export function useDocument<T extends DocumentData, W = T>(
  path: FirebaseDocument | undefined,
  segment: string | undefined,
  options?: UseDocumentOptions<T, W>
): SwrResult<W> {
  const mapper = options?.mapper
  const { data, mutate } = useDocumentInternal<T, W>(path, segment, options)
  useEffect(() => {
    // No need to listen when mocking
    if (config.useMock && path && options?.listen) {
      return onSnapshot<T>(doc(getFirestore(), path) as DocumentReference<T>, (doc) => {
        // Only mutate if the current doc has changed
        if (doc.exists() && mutate && doc.id === segment) {
          if (!isNil(mapper)) {
            mapper(doc)
              .then((mappedDoc) => {
                void mutate(successfulResult(mappedDoc))
              })
              .catch((error) => {
                logger.error(`mapping error: ${errorMessage(error)}`)
              })
          } else {
            void mutate(successfulResult(doc as unknown as W))
          }
        }
      })
    }
    return
  }, [options, path, mutate, segment, mapper])
  return data
}
