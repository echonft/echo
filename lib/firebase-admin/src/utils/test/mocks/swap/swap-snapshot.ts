import { FirestoreSnapshot } from '../../../../types/abstract/firestore-snapshot'
import { offerReferences } from '../offer/offer-reference'
import { FirestoreSwap } from '@echo/firestore'

export const swapSnapshots: { [key: string]: FirestoreSnapshot<FirestoreSwap> } = {
  hS6KtAJ03bSolumoHvDJ: {
    ref: {
      path: 'swaps/hS6KtAJ03bSolumoHvDJ'
    },
    id: 'hS6KtAJ03bSolumoHvDJ',
    exists: true,
    data: () => ({
      state: 'PENDING_APPROVALS',
      offer: offerReferences['LyCfl6Eg7JKuD7XJ6IPi']!,
      expiresAt: 1676984897,
      createdAt: 1676984897,
      activities: [
        {
          date: 1676984897,
          toState: 'PENDING_APPROVALS'
        }
      ]
    })
  } as unknown as FirestoreSnapshot<FirestoreSwap>
}
