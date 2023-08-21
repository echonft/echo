import { Swap } from '../../src/types/model/swap'
import { offerMock } from './offer-mock'
import dayjs from 'dayjs'

export const swapMock: { [key: string]: Swap } = {
  hS6KtAJ03bSolumoHvDJ: {
    id: 'hS6KtAJ03bSolumoHvDJ',
    createdAt: dayjs.unix(1676984897),
    expired: true,
    expiresAt: dayjs.unix(1676984897),
    postedAt: dayjs.unix(1676984897),
    offer: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!,
    state: 'PENDING_APPROVALS'
  }
}
