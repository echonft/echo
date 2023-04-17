import { FirestoreSnapshot } from '../../../types/abstract/firestore-snapshot'
import { DocumentData } from '@google-cloud/firestore'

export const emptySnapshot: <T extends DocumentData>() => FirestoreSnapshot<T> = () => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ref: {
    path: ''
  },
  id: '',
  exists: false,
  data: () => undefined
})
