import { FirestoreSnapshot } from '../../../../types/abstract/firestore-snapshot'
import { contracts } from './contract'
import { FirestoreContract } from '@echo/firestore'
import { omit } from 'ramda'

export const contractSnapshots: { [key: string]: FirestoreSnapshot<FirestoreContract> } = {
  '37dBlwJYahEAKeL0rNP8': {
    ref: {
      path: 'contracts/37dBlwJYahEAKeL0rNP8'
    },
    id: '37dBlwJYahEAKeL0rNP8',
    exists: true,
    data: () => omit(['id'], contracts['37dBlwJYahEAKeL0rNP8']!)
  } as FirestoreSnapshot<FirestoreContract>
}

export const invalidContractSnapshot: FirestoreSnapshot<FirestoreContract> = {
  ref: {
    path: 'contracts/test'
  },
  id: 'test',
  exists: false,
  data: () => undefined
} as FirestoreSnapshot<FirestoreContract>
