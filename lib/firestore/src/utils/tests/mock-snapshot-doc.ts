import { FirestoreDocumentSnapshot } from '../../types'
import { DocumentData } from 'firebase/firestore'

export const mockSnapshotDoc = <T extends DocumentData>(id: string, data: T): FirestoreDocumentSnapshot<T> => ({
  id,
  data
})
