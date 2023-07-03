import { FirestoreSwapData } from '../types/model/data/swap/firestore-swap-data'
import { offerFirestoreData } from './offer-firestore-data'

export const swapFirestoreData: { [key: string]: FirestoreSwapData } = {
  hS6KtAJ03bSolumoHvDJ: {
    refPath: 'swaps/hS6KtAJ03bSolumoHvDJ',
    id: 'hS6KtAJ03bSolumoHvDJ',
    state: 'PENDING_APPROVALS',
    offer: offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!,
    expiresAt: 1676984897,
    createdAt: 1676984897,
    activities: [
      {
        date: 1676984897,
        toState: 'PENDING_APPROVALS'
      }
    ]
  }
}
