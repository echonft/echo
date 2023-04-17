import { offerData } from '../offer/offer-data'
import { FirestoreSwapData } from '@echo/firestore'

export const swapData: { [key: string]: FirestoreSwapData } = {
  hS6KtAJ03bSolumoHvDJ: {
    refPath: 'swaps/hS6KtAJ03bSolumoHvDJ',
    id: 'hS6KtAJ03bSolumoHvDJ',
    state: 'PENDING_APPROVALS',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    offer: offerData['LyCfl6Eg7JKuD7XJ6IPi']!,
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
