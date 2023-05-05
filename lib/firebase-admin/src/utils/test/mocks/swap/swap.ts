import { offers } from '../offer/offer'
import { Swap, SwapState } from '@echo/model'
import { unix } from 'dayjs'

// TODO Move to @echo/model
export const swaps: { [key: string]: Swap } = {
  hS6KtAJ03bSolumoHvDJ: {
    id: 'hS6KtAJ03bSolumoHvDJ',
    state: SwapState.PENDING_APPROVALS,
    offer: offers['LyCfl6Eg7JKuD7XJ6IPi']!,
    expiresAt: unix(1676984897),
    createdAt: unix(1676984897),
    activities: [
      {
        date: unix(1676984897),
        toState: SwapState.PENDING_APPROVALS,
        fromState: undefined
      }
    ]
  }
}
