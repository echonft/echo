import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { getDocRefFromPath } from './get-doc-ref-from-path'
import { getDocSnapshotFromRef } from './get-doc-snapshot-from-ref'
import { DocumentData } from 'firebase/firestore'

/**
 * Get the document from a path and a segment. Syntax sugar for typing
 * @param path The firebase path
 * @param pathSegments – Additional path segments that will be applied relative to the first argument.
 */
export const getDocSnapshotFromPath = <T extends DocumentData>(
  path: string,
  ...pathSegments: string[]
): Promise<FirestoreSnapshot<T>> => getDocSnapshotFromRef(getDocRefFromPath(path, ...pathSegments))
