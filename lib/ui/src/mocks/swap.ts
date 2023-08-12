import { Swap } from '../types/swap'
import { SwapState } from '../types/swap-state'
import { offers } from './offer'
import dayjs from 'dayjs'

export const swaps: { [key: string]: Swap } = {
  hS6KtAJ03bSolumoHvDJ: {
    id: 'hS6KtAJ03bSolumoHvDJ',
    state: SwapState.PENDING_APPROVALS,
    offer: offers['LyCfl6Eg7JKuD7XJ6IPi']!,
    expiresAt: dayjs.unix(1676984897),
    createdAt: dayjs.unix(1676984897),
    activities: [
      {
        date: dayjs.unix(1676984897),
        fromState: undefined,
        toState: SwapState.PENDING_APPROVALS
      }
    ]
  }
}
