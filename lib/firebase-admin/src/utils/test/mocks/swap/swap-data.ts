import { offerData } from '../offer/offer-data'
import { FirestoreSwapActivityData, FirestoreSwapData } from '@echo/firestore'

export const swapActivityData: { [key: string]: FirestoreSwapActivityData } = {
  ZyufQpi7evabehDReS0Q: {
    id: 'ZyufQpi7evabehDReS0Q',
    date: 1676984897,
    toState: 'PENDING_APPROVALS'
  }
}

export const swapData: { [key: string]: FirestoreSwapData } = {
  hS6KtAJ03bSolumoHvDJ: {
    id: 'hS6KtAJ03bSolumoHvDJ',
    state: 'PENDING_APPROVALS',
    offer: Object.assign({}, offerData['LyCfl6Eg7JKuD7XJ6IPi']!, {
      activities: {
        path: 'offers/LyCfl6Eg7JKuD7XJ6IPi/activities',
        data: undefined
      }
    }),
    expiresAt: 1676984897,
    createdAt: 1676984897,
    activities: {
      path: 'swaps/hS6KtAJ03bSolumoHvDJ/activities',
      data: Object.values(swapActivityData)
    }
  }
}
