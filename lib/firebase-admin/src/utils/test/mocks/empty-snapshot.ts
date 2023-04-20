import { FirestoreSnapshot } from '../../../types/abstract/firestore-snapshot'
import { DocumentData } from '@google-cloud/firestore'

export const emptySnapshot = <T extends DocumentData>(): FirestoreSnapshot<T> =>
  ({
    ref: {
      path: ''
    },
    id: '',
    exists: false,
    data: () => undefined
  } as FirestoreSnapshot<T>)
