import { offers } from '../offer/offer'
import { Swap, SwapActivity, SwapState } from '@echo/model'
import dayjs from 'dayjs'

export const swapActivities: { [key: string]: SwapActivity } = {
  ZyufQpi7evabehDReS0Q: {
    id: 'ZyufQpi7evabehDReS0Q',
    date: dayjs(1676984897),
    toState: SwapState.PENDING_APPROVALS,
    fromState: undefined
  }
}

export const swaps: { [key: string]: Swap } = {
  hS6KtAJ03bSolumoHvDJ: {
    id: 'hS6KtAJ03bSolumoHvDJ',
    state: SwapState.PENDING_APPROVALS,
    offer: Object.assign({}, offers['LyCfl6Eg7JKuD7XJ6IPi']!, {
      activities: undefined
    }),
    expiresAt: dayjs(1676984897),
    createdAt: dayjs(1676984897),
    activities: Object.values(swapActivities)
  }
}
