import { Swap } from '../../../../types/swap'
import { SwapState } from '../../../../types/swap-state'
import { mockOffer } from '../offer/mock-offer'
import dayjs from 'dayjs'

export const mockSwap: Swap = {
  id: 'hS6KtAJ03bSolumoHvDJ',
  state: SwapState.PENDING_APPROVALS,
  offer: mockOffer,
  expiresAt: dayjs.unix(1676984897),
  createdAt: dayjs.unix(1676984897),
  activities: [
    {
      date: dayjs.unix(1676984897),
      toState: SwapState.PENDING_APPROVALS,
      fromState: undefined
    }
  ]
}
