import { FirestoreMapper } from '../../types'
import { getDocSnapshotFromPath } from './get-doc-snapshot-from-path'
import { DocumentData } from 'firebase/firestore'

export const getMappedDoc = <T extends DocumentData, V>(
  mapper: FirestoreMapper<T, V>,
  path: string,
  ...pathSegments: string[]
) => getDocSnapshotFromPath<T>(path, ...pathSegments).then(mapper)
