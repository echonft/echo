import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { getDocRefFromPath } from './get-doc-ref-from-path'
import { getDocSnapshotFromRef } from './get-doc-snapshot-from-ref'
import { DocumentData } from '@google-cloud/firestore'

export const getDocSnapshot = <T extends DocumentData>(
  collectionPath: string,
  documentPath: string
): Promise<FirestoreSnapshot<T>> => getDocSnapshotFromRef<T>(getDocRefFromPath(collectionPath, documentPath))
