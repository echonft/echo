import { FirestoreSwap } from '../../../src/types/model/collections/swap/firestore-swap'
import { swapSnapshots } from './swap-snapshot'
import { DocumentReference } from 'firebase-admin/firestore'

export const swapReferences: { [key: string]: DocumentReference<FirestoreSwap> } = {
  hS6KtAJ03bSolumoHvDJ: {
    path: 'swaps/hS6KtAJ03bSolumoHvDJ',
    id: 'hS6KtAJ03bSolumoHvDJ',
    get: () => Promise.resolve(swapSnapshots['hS6KtAJ03bSolumoHvDJ']!)
  } as unknown as DocumentReference<FirestoreSwap>
}
