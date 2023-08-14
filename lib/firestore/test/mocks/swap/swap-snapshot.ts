import { FirestoreSnapshot } from '../../../src/types/abstract/firestore-snapshot'
import { FirestoreSwap } from '../../../src/types/model/collections/swap/firestore-swap'
import { swapFirestoreData } from './swap-firestore-data'
import { always, omit } from 'ramda'

export const swapSnapshots: { [key: string]: FirestoreSnapshot<FirestoreSwap> } = {
  hS6KtAJ03bSolumoHvDJ: {
    ref: {
      path: 'swaps/hS6KtAJ03bSolumoHvDJ'
    },
    id: 'hS6KtAJ03bSolumoHvDJ',
    exists: true,
    data: always(omit(['refPath', 'id'], swapFirestoreData['hS6KtAJ03bSolumoHvDJ']))
  } as unknown as FirestoreSnapshot<FirestoreSwap>
}
