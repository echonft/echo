import { FirestoreSnapshot } from '../../../src/types/abstract/firestore-snapshot'
import { FirestoreContract } from '../../../src/types/model/collections/contract/firestore-contract'
import { contractFirestoreData } from './contract-firestore-data'
import { always, omit } from 'ramda'

export const contractSnapshots: { [key: string]: FirestoreSnapshot<FirestoreContract> } = {
  '37dBlwJYahEAKeL0rNP8': {
    ref: {
      path: 'contracts/37dBlwJYahEAKeL0rNP8'
    },
    id: '37dBlwJYahEAKeL0rNP8',
    exists: true,
    data: always(omit(['refPath', 'id'], contractFirestoreData['37dBlwJYahEAKeL0rNP8']))
  } as unknown as FirestoreSnapshot<FirestoreContract>
}

export const invalidContractSnapshot: FirestoreSnapshot<FirestoreContract> = {
  ref: {
    path: 'contracts/test'
  },
  id: 'test',
  exists: false,
  data: () => undefined
} as unknown as FirestoreSnapshot<FirestoreContract>
