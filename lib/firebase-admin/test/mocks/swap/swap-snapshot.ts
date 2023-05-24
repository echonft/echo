import { FirestoreSnapshot, FirestoreSwap, swapFirestoreData } from '@echo/firestore'
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
