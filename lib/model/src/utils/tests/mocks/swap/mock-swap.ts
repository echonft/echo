import { Swap } from '../../../../types/swap'
import { SwapState } from '../../../../types/swap-state'
import { mockOffer } from '../offer/mock-offer'
import { unix } from 'dayjs'

export const mockSwap: Swap = {
  id: 'hS6KtAJ03bSolumoHvDJ',
  state: SwapState.PENDING_APPROVALS,
  offer: mockOffer,
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
