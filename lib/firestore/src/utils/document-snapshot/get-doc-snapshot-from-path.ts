import { FirestoreDocumentPath } from '../../types/utils/firestore-document-path'
import { FirestoreDocumentSnapshot } from '../../types/utils/firestore-document-snapshot'
import { getDocRef } from '../document-reference/get-doc-ref'
import { getDocSnapshotFromRef } from './get-doc-snapshot-from-ref'
import { DocumentData } from 'firebase/firestore'

/**
 * Get the document from a path and a segment. Syntax sugar for typing
 * @param path The firebase path
 * @param pathSegments – Additional path segments that will be applied relative to the first argument.
 */
export const getDocSnapshotFromPath = <T extends DocumentData>(
  path: FirestoreDocumentPath,
  pathSegments: string[] = []
): Promise<FirestoreDocumentSnapshot<T>> => getDocSnapshotFromRef(getDocRef(path, pathSegments))
