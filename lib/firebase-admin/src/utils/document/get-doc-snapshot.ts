import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { getDocRefFromPath } from './get-doc-ref-from-path'
import { getDocSnapshotFromRef } from './get-doc-snapshot-from-ref'
import { CollectionName } from '@echo/firestore'
import { errorPromise } from '@echo/utils'
import { DocumentData } from '@google-cloud/firestore'
import { ifElse, isNil, pipe } from 'ramda'

export const getDocSnapshot = <T extends DocumentData>(
  collectionPath: CollectionName,
  documentPath: string
): Promise<FirestoreSnapshot<T>> =>
  pipe(getDocRefFromPath, ifElse(isNil, errorPromise<FirestoreSnapshot<T>>('ref not found'), getDocSnapshotFromRef<T>))(
    collectionPath,
    documentPath
  )
